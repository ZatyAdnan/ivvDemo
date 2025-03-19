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
    const body = await readBody(event);

    // Validate required fields
    if (!body) {
      return {
        statusCode: 400,
        message: "Request body is required"
      };
    }

    // Parse dates if they exist
    let startDate, endDate;
    if (body.tarikhSemakan) {
      const [start, end] = body.tarikhSemakan.split(' - ');
      startDate = start ? new Date(start) : null;
      endDate = end ? new Date(end) : null;
    }

    // Update document information
    const updatedDocument = await prisma.kontraktor_dokumen.update({
      where: {
        kontraktorDoc_id: parseInt(documentId)
      },
      data: {
        kontraktorDoc_fasa: body.fasa,
        kontraktorDoc_produk_kerja: body.produkKerja,
        kontraktorDoc_bil_mukasurat: parseInt(body.bilMukaSurat),
        kontraktorDoc_sesi_semakan: parseInt(body.sesiSemakan),
        kontraktorDoc_start_semakan: startDate,
        kontraktorDoc_end_semakan: endDate,
      }
    });

    return {
      statusCode: 200,
      message: "Document information updated successfully",
      data: {
        documentId: updatedDocument.kontraktorDoc_id,
        fasa: updatedDocument.kontraktorDoc_fasa,
        produkKerja: updatedDocument.kontraktorDoc_produk_kerja,
        bilMukaSurat: updatedDocument.kontraktorDoc_bil_mukasurat,
        sesiSemakan: updatedDocument.kontraktorDoc_sesi_semakan,
        tarikhSemakan: updatedDocument.kontraktorDoc_start_semakan && updatedDocument.kontraktorDoc_end_semakan ? 
          `${new Date(updatedDocument.kontraktorDoc_start_semakan).toLocaleDateString('ms-MY')} - ${new Date(updatedDocument.kontraktorDoc_end_semakan).toLocaleDateString('ms-MY')}` : 
          ""
      }
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 