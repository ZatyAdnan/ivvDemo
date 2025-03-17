export default defineEventHandler(async (event) => {
  try {
    // Get user from context (set by auth middleware)
    const user = event.context.user;

    // Check if user is authenticated
    if (!user || !user.userID) {
      return {
        statusCode: 401,
        message: "Unauthorized access",
      };
    }

    const projects = await prisma.projek.findMany({
      where: {
        // Only show projects created by the user unless they have admin role
        ...(user.roles.includes("Admin")
          ? {}
          : { projek_createdBy: user.userID }),
      },
      select: {
        projek_id: true,
        projek_nama: true,
        projek_kod: true,
        projek_status: true,
        projek_nama_pic: true,
        lookup: {
          select: {
            lookupValue: true,
          },
        },
        user: {
          select: {
            userFullName: true,
          },
        },
      },
      orderBy: {
        projek_createdAt: "desc",
      },
    });

    // Transform the data to match the frontend structure
    const transformedProjects = projects.map((project) => ({
      namaProjek: project.projek_nama,
      personInCharge: project.projek_nama_pic,
      status: project.lookup.lookupValue,
      action: {
        view: `/ivv/projects/view/${project.projek_id}`,
        edit: `/ivv/projects/edit/${project.projek_id}`,
      },
    }));

    return {
      statusCode: 200,
      message: "Projects retrieved successfully",
      data: transformedProjects,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
});
