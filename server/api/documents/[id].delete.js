export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);

    // Check if document exists
    const existingDocument = await prisma.dokumen.findUnique({
      where: {
        dokumen_id: id
      },
      include: {
        _count: {
          select: {
            kontraktor_dokumen: true
          }
        }
      }
    });

    if (!existingDocument) {
      return {
        statusCode: 404,
        message: "Document not found"
      };
    }

    // Check if there are any contractor documents using this document
    if (existingDocument._count.kontraktor_dokumen > 0) {
      return {
        statusCode: 400,
        message: "Cannot delete document that is being used by contractors"
      };
    }

    // Delete document
    await prisma.dokumen.delete({
      where: {
        dokumen_id: id
      }
    });

    return {
      statusCode: 200,
      message: "Document deleted successfully"
    };
  } catch (error) {
    console.error("Error deleting document:", error);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 