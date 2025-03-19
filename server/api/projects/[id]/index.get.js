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

    const projectId = parseInt(event.context.params.id);

    // Get project details with related data
    const project = await prisma.projek.findUnique({
      where: {
        projek_id: projectId
      },
      include: {
        kontraktor: true,
        lookup: true,
        kontraktor_dokumen: {
          include: {
            dokumen: true
          }
        }
      }
    });

    if (!project) {
      return {
        statusCode: 404,
        message: "Project not found"
      };
    }

    // Get document statistics
    const documentStats = {
      totalDocuments: project.kontraktor_dokumen.length,
      pendingDocuments: project.kontraktor_dokumen.filter(doc => doc.kontraktorDoc_status === 1).length,
      lateDocuments: project.kontraktor_dokumen.filter(doc => {
        const dueDate = new Date(doc.kontraktorDoc_end_semakan);
        return dueDate < new Date() && doc.kontraktorDoc_status !== 3;
      }).length
    };

    // Get document types from lookup table
    const documentTypes = await prisma.dokumen.findMany({
      select: {
        dokumen_id: true,
        dokumen_name: true,
        kontraktor_dokumen: {
          where: {
            kontraktorDoc_projekID: projectId
          }
        }
      }
    });

    const formattedDocTypes = documentTypes.map(type => ({
      id: type.dokumen_id,
      jenisDokumen: type.dokumen_name,
      jumlahDokumenDisemak: type.kontraktor_dokumen.length,
      tindakan: "" // Add empty tindakan field for the table component
    }));

    return {
      statusCode: 200,
      message: "Project details retrieved successfully",
      data: {
        projectDetails: {
          projectName: project.projek_nama,
          contractorName: project.kontraktor.kontraktor_nama,
          status: project.lookup.lookupValue
        },
        documentStats,
        documentTypes: formattedDocTypes
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