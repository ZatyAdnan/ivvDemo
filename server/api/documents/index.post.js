export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate required fields
    if (!body.name || !body.km) {
      return {
        statusCode: 400,
        message: "Name and KM are required"
      };
    }

    // Check if document already exists
    const existingDocument = await prisma.dokumen.findFirst({
      where: {
        dokumen_name: body.name
      }
    });

    if (existingDocument) {
      return {
        statusCode: 400,
        message: "Document already exists"
      };
    }

    // Create new document
    const newDocument = await prisma.dokumen.create({
      data: {
        dokumen_name: body.name,
        dokumen_km: body.km,
        dokumen_status: body.status || 'ACTIVE'
      }
    });

    return {
      statusCode: 201,
      message: "Document created successfully",
      data: {
        id: newDocument.dokumen_id,
        name: newDocument.dokumen_name,
        km: newDocument.dokumen_km,
        status: newDocument.dokumen_status,
        documentCount: 0
      }
    };
  } catch (error) {
    console.error("Error creating document:", error);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 