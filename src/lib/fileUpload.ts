import { promises as fs } from 'fs';
import path from 'path';

export async function saveFileLocally(file: File, userId: string): Promise<string> {
  // Create uploads directory if it doesn't exist
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }

  // Generate unique filename
  const timestamp = Date.now();
  const ext = file.name.split('.').pop();
  const filename = `user-${userId}-${timestamp}.${ext}`;
  const filePath = path.join(uploadDir, filename);

  // Convert file to buffer and save
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await fs.writeFile(filePath, buffer);

  return `/uploads/${filename}`;
}

export async function deleteLocalFile(filePath: string) {
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    await fs.unlink(fullPath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}