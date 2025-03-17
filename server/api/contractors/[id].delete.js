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

    const id = parseInt(event.context.params.id);

    // Check if contractor exists
    const existingContractor = await prisma.kontraktor.findUnique({
      where: {
        kontraktor_id: id
      }
    });

    if (!existingContractor) {
      return {
        statusCode: 404,
        message: "Contractor not found"
      };
    }

    // Check if contractor has any associated projects
    const hasProjects = await prisma.projek.findFirst({
      where: {
        projek_kontraktor: id
      }
    });

    if (hasProjects) {
      return {
        statusCode: 400,
        message: "Cannot delete contractor with associated projects"
      };
    }

    // Delete contractor
    await prisma.kontraktor.delete({
      where: {
        kontraktor_id: id
      }
    });

    return {
      statusCode: 200,
      message: "Contractor deleted successfully"
    };

  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 