export default defineEventHandler(async (event) => {
  try {
    // Get user from context (set by auth middleware)
    const user = event.context.user;
    
    // Check if user is authenticated
    if (!user || !user.userID) {
      return {
        statusCode: 401,
        message: "Unauthorized access"
      };
    }

    // Get all active document types
    const documentTypes = await prisma.dokumen.findMany({
      where: {
        dokumen_status: "ACTIVE"
      },
      select: {
        dokumen_id: true,
        dokumen_name: true,
        dokumen_km: true
      },
      orderBy: {
        dokumen_name: 'asc'
      }
    });

    return {
      statusCode: 200,
      message: "Document types retrieved successfully",
      data: documentTypes.map(doc => ({
        id: doc.dokumen_id,
        name: doc.dokumen_name,
        km: doc.dokumen_km
      }))
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 