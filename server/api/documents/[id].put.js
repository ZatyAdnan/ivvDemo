export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
    const body = await readBody(event);

    // Validate required fields
    if (!body.name || !body.km) {
      return {
        statusCode: 400,
        message: "Name and KM are required"
      };
    }

    // Check if document exists
    const existingDocument = await prisma.dokumen.findUnique({
      where: {
        dokumen_id: id
      }
    });

    if (!existingDocument) {
      return {
        statusCode: 404,
        message: "Document not found"
      };
    }

    // Check if name is already used by another document
    const duplicateCheck = await prisma.dokumen.findFirst({
      where: {
        dokumen_name: body.name,
        dokumen_id: {
          not: id
        }
      }
    });

    if (duplicateCheck) {
      return {
        statusCode: 400,
        message: "Document name already exists"
      };
    }

    // Update document
    const updatedDocument = await prisma.dokumen.update({
      where: {
        dokumen_id: id
      },
      data: {
        dokumen_name: body.name,
        dokumen_km: body.km,
        dokumen_status: body.status || existingDocument.dokumen_status
      },
      include: {
        _count: {
          select: {
            kontraktor_dokumen: true
          }
        }
      }
    });

    return {
      statusCode: 200,
      message: "Document updated successfully",
      data: {
        id: updatedDocument.dokumen_id,
        name: updatedDocument.dokumen_name,
        km: updatedDocument.dokumen_km,
        status: updatedDocument.dokumen_status,
        documentCount: updatedDocument._count.kontraktor_dokumen
      }
    };
  } catch (error) {
    console.error("Error updating document:", error);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 