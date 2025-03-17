export default defineEventHandler(async (event) => {
  try {
    const type = event.context.params.type;

    if (!type) {
      return {
        statusCode: 400,
        message: "Lookup type is required"
      };
    }

    const lookupData = await prisma.lookup.findMany({
      where: {
        lookupType: type,
        lookupStatus: 'Aktif'
      },
      select: {
        lookupID: true,
        lookupValue: true,
        lookupRefCode: true,
        lookupOrder: true
      },
      orderBy: {
        lookupOrder: 'asc'
      }
    });

    return {
      statusCode: 200,
      message: "Lookup data retrieved successfully",
      data: lookupData
    };

  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "Internal server error"
    };
  }
}); 