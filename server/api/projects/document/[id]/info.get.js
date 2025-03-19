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

    const documentId = event.context.params.id;

    // Get document information
    const document = await prisma.kontraktor_dokumen.findUnique({
      where: {
        kontraktorDoc_id: parseInt(documentId)
      },
      include: {
        dokumen: true, // Include document type information
      }
    });

    if (!document) {
      return {
        statusCode: 404,
        message: "Document not found"
      };
    }

    // Format the response
    const documentInfo = {
      namaDeliverable: document.dokumen.dokumen_name,
      idDokumen: document.kontraktorDoc_id_dokumen,
      versiDokumen: document.kontraktorDoc_version?.toString() || "1.0",
      fasa: document.kontraktorDoc_fasa || "",
      produkKerja: document.kontraktorDoc_produk_kerja || "",
      bilMukaSurat: document.kontraktorDoc_bil_mukasurat?.toString() || "0",
      namaPenyemak: user.userFullName || "",
      tarikhSemakan: document.kontraktorDoc_start_semakan && document.kontraktorDoc_end_semakan ? 
        `${new Date(document.kontraktorDoc_start_semakan).toLocaleDateString('ms-MY')} - ${new Date(document.kontraktorDoc_end_semakan).toLocaleDateString('ms-MY')}` : 
        "",
      sesiSemakan: document.kontraktorDoc_sesi_semakan?.toString() || "1",
      bilKmTidakPatuh: "0" // This might need to be calculated from kontraktor_dokumen_butiran
    };

    return {
      statusCode: 200,
      message: "Document information retrieved successfully",
      data: documentInfo
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 