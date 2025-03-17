export default defineEventHandler(async (event) => {
  try {
    // Get all documents with their related data
    const documents = await prisma.dokumen.findMany({
      include: {
        _count: {
          select: {
            kontraktor_dokumen: true
          }
        }
      }
    });

    // Get pending documents count
    const pendingCount = await prisma.dokumen.count({
      where: {
        dokumen_status: 'PENDING'
      }
    });

    // Transform data to match frontend expectations
    const transformedData = documents.map(doc => ({
      id: doc.dokumen_id,
      name: doc.dokumen_name,
      km: doc.dokumen_km,
      status: doc.dokumen_status,
      documentCount: doc._count.kontraktor_dokumen
    }));

    return {
      statusCode: 200,
      message: "Documents retrieved successfully",
      data: transformedData,
      summary: {
        total: documents.length,
        pending: pendingCount
      }
    };
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 