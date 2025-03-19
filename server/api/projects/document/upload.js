import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";
import { readBody } from "h3";

export default defineEventHandler(async (event) => {
  try {
    // Get user from context (set by auth middleware)
    const user = event.context.user;

    // Check if user is authenticated
    if (!user || !user.userID) {
      return {
        statusCode: 401,
        message: "Unauthorized access",
      };
    }

    // Get request body
    const body = await readBody(event);
    
    if (!body.file || !body.projectId || !body.documentTypeId) {
      return {
        statusCode: 400,
        message: "Missing required fields",
      };
    }

    const { file, projectId, documentTypeId } = body;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      return {
        statusCode: 400,
        message: "Invalid file type. Only PDF and DOCX files are allowed.",
      };
    }

    // Create upload directory if it doesn't exist
    const uploadDir = join(
      process.cwd(),
      "public",
      "uploads",
      projectId.toString()
    );
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split(".").pop();
    const fileName = `doc_${timestamp}.${fileExt}`;
    const filePath = join("uploads", projectId.toString(), fileName);
    const fullPath = join(process.cwd(), "public", filePath);

    // Convert base64 to buffer and save file
    const base64Data = file.base64.split(';base64,').pop();
    const fileBuffer = Buffer.from(base64Data, 'base64');
    await writeFile(fullPath, fileBuffer);

    // Get latest version number for this document type in this project
    const latestVersion = await prisma.kontraktor_dokumen.findFirst({
      where: {
        kontraktorDoc_projekID: parseInt(projectId),
        kontraktorDoc_dokumen_type: parseInt(documentTypeId),
      },
      orderBy: {
        kontraktorDoc_version: "desc",
      },
      select: {
        kontraktorDoc_version: true,
      },
    });

    const newVersion = (latestVersion?.kontraktorDoc_version || 0) + 1;

    // Get count of documents for this type to generate document ID
    const documentCount = await prisma.kontraktor_dokumen.count({
      where: {
        kontraktorDoc_dokumen_type: parseInt(documentTypeId),
      },
    });

    // Generate document ID (DOC-TYPE-COUNT+1)
    const documentId = `DOC-${documentTypeId}-${(documentCount + 1).toString().padStart(3, '0')}`;

    // Create document record in database
    const document = await prisma.kontraktor_dokumen.create({
      data: {
        kontraktorDoc_id_dokumen: documentId,
        kontraktorDoc_projekID: parseInt(projectId),
        kontraktorDoc_dokumen_type: parseInt(documentTypeId),
        kontraktorDoc_name: file.name,
        kontraktorDoc_dokumen_path: filePath,
        kontraktorDoc_version: newVersion,
        kontraktorDoc_bil_mukasurat: 0,
        kontraktorDoc_skor: 0,
        kontraktorDoc_status: 35, // Using lookup ID 35 for "Dalam Proses" status
        kontraktorDoc_createdAt: new Date(),
        kontraktorDoc_createdBY: user.userID,
      },
    });

    return {
      statusCode: 201,
      message: "Document uploaded successfully",
      data: {
        documentId: document.kontraktorDoc_id,
        version: document.kontraktorDoc_version,
        fileName: document.kontraktorDoc_name,
        filePath: document.kontraktorDoc_dokumen_path,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
});
