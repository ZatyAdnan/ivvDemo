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

    const documentTypeId = parseInt(event.context.params.id);
    const query = getQuery(event);
    const projectId = parseInt(query.projectId);

    if (!projectId) {
      return {
        statusCode: 400,
        message: "Project ID is required"
      };
    }

    // First get project details
    const project = await prisma.projek.findUnique({
      where: {
        projek_id: projectId
      },
      include: {
        kontraktor: true
      }
    });

    if (!project) {
      return {
        statusCode: 404,
        message: "Project not found"
      };
    }

    // Get document type details with related documents for this project
    const documentType = await prisma.dokumen.findUnique({
      where: {
        dokumen_id: documentTypeId
      },
      include: {
        kontraktor_dokumen: {
          where: {
            kontraktorDoc_projekID: projectId
          },
          orderBy: {
            kontraktorDoc_version: 'desc'
          }
        }
      }
    });

    if (!documentType) {
      return {
        statusCode: 404,
        message: "Document type not found"
      };
    }

    // Get document statistics
    const documentStats = {
      totalDocuments: documentType.kontraktor_dokumen.length,
      pendingDocuments: documentType.kontraktor_dokumen.filter(doc => doc.kontraktorDoc_status === 1).length,
      lateDocuments: documentType.kontraktor_dokumen.filter(doc => {
        const dueDate = new Date(doc.kontraktorDoc_end_semakan);
        return dueDate < new Date() && doc.kontraktorDoc_status !== 3;
      }).length
    };

    // Format documents list
    const documents = documentType.kontraktor_dokumen.map(doc => ({
      id: doc.kontraktorDoc_id,
      versi: doc.kontraktorDoc_version || 1,
      namaDokumen: doc.kontraktorDoc_name,
      tarikhSemakan: doc.kontraktorDoc_end_semakan ? new Date(doc.kontraktorDoc_end_semakan).toLocaleDateString('ms-MY') : '-',
      skor: doc.kontraktorDoc_skor || 0,
      status: doc.kontraktorDoc_status === 1 ? 'Dalam Proses' : 'Lengkap',
      action: "" // Empty action field for the table component
    }));

    return {
      statusCode: 200,
      message: "Document details retrieved successfully",
      data: {
        projectDetails: {
          projectName: project.projek_nama,
          contractorName: project.kontraktor.kontraktor_nama
        },
        documentStats,
        documents
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