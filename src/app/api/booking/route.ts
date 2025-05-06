import { NextRequest, NextResponse } from "next/server";
import { AddOn, PrismaClient } from "@/generated/prisma";
import Cors from "cors";
import { IncomingHttpHeaders } from "http";

export const prisma = new PrismaClient();

// Initialize CORS middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: "http://localhost:3001",
});

// Convert Next.js request to compatible CORS request
function createCorsRequest(req: NextRequest): { method?: string, headers: IncomingHttpHeaders } {
  const headers: IncomingHttpHeaders = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return {
    method: req.method,
    headers
  };
}

async function runMiddleware(req: NextRequest) {
  const request = createCorsRequest(req);
  const headers = new Headers();
  
  const response = {
    getHeader: (name: string) => headers.get(name),
    setHeader: (name: string, value: string) => headers.set(name, value),
    end: () => {},
    statusCode: 200,
    status: (code: number) => {
      response.statusCode = code;
      return response;
    },
    json: (data: unknown) => data,
  };

  await new Promise((resolve, reject) => {
    cors(
      request,
      response,
      (result: unknown) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      }
    );
  });

  return headers;
}

export async function POST(req: NextRequest) {
  try {
    // Run CORS middleware
    const corsHeaders = await runMiddleware(req);

    const body = await req.json();

    // Validate required fields
    const requiredFields = [
      "selectedPackage",
      "propertyType",
      "propertySize",
      "buildingName",
      "unitNumber",
      "floor",
      "street",
      "date",
      "timeSlot",
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", missingFields },
        { status: 400, headers: Object.fromEntries(corsHeaders.entries()) }
      );
    }

    const {
      selectedPackage,
      isLoading = false,
      propertyType,
      propertySize,
      buildingName,
      unitNumber,
      floor,
      street,
      additionalInfo = '',
      addOns = [],
      date,
      timeSlot,
      firstName,
      lastName,
      email,
      phoneNumber,
    } = body;

    // Create or connect the selected package
    let createdPackageId = null;
    if (selectedPackage) {
      const createdPackage = await prisma.selectedPackage.create({
        data: {
          name: selectedPackage.name,
          price: selectedPackage.price,
          description: selectedPackage.description,
          features: selectedPackage.features.join(", "),
          pricePerExtra: selectedPackage.pricePerExtra,
        },
      });
      createdPackageId = createdPackage.id;
    }

    // Create the property address
    const createdAddress = await prisma.propertyAddress.create({
      data: {
        buildingName,
        unitNumber,
        floor,
        street,
      },
    });

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        selectedPackageId: createdPackageId,
        propertyAddressId: createdAddress.id,
        userId: body.userId,
        isLoading,
        propertyType,
        propertySize,
        date: new Date(date),
        timeSlot,
        firstName,
        lastName,
        email,
        phoneNumber,
        additionalInfo,
        addOns: {
          connectOrCreate: addOns.map((addOn: AddOn) => ({
            where: { name: addOn.name },
            create: { name: addOn.name, price: addOn.price },
          })),
        },
        status: "CREATED",
      },
      include: {
        selectedPackage: true,
        propertyAddress: true,
        addOns: true,
      },
    });

    return NextResponse.json(booking, {
      status: 201,
      headers: Object.fromEntries(corsHeaders.entries()),
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { 
        error: "Failed to create booking", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Add OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3001",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}