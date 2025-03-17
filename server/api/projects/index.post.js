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

    // Get request body
    const body = await readBody(event);
    
    // Validate required fields
    const requiredFields = ['projectName', 'projectCode', 'contractor', 'startDate', 'endDate', 'projectManager', 'email'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        message: `Missing required fields: ${missingFields.join(', ')}`
      };
    }

    // Create new project
    const newProject = await prisma.projek.create({
      data: {
        projek_nama: body.projectName,
        projek_kod: body.projectCode,
        projek_skop: body.description || '',
        projek_kontraktor: parseInt(body.contractor),
        projek_mula: new Date(body.startDate),
        projek_tamat: new Date(body.endDate),
        projek_amaun: parseFloat(body.budget || 0),
        projek_status: parseInt(body.status || 1), // Default to first status if not provided
        projek_nama_pic: body.projectManager,
        projek_emel_pic: body.email,
        projek_kontakNo_pic: body.phone || '',
        projek_createdBy: user.userID,
        projek_createdAt: new Date(),
        projek_updatedAt: new Date()
      }
    });

    return {
      statusCode: 201,
      message: "Project created successfully",
      data: newProject
    };

  } catch (error) {
    console.log(error);
    
    // Handle unique constraint violations
    if (error.code === 'P2002') {
      return {
        statusCode: 400,
        message: "Project code already exists"
      };
    }

    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 