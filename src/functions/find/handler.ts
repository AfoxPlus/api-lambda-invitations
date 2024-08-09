import { InvitationDataRepository } from '@core/data/repositories/InvitationDataRepository';
import { InvitationRepository } from '@core/domain/repositories/InvitationRepository';
import { formatJSONErrorResponse, formatJSONSuccessResponse } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { mongodbconnect } from '@utils/mongodb_connection';
import { APIGatewayProxyHandler } from 'aws-lambda/trigger/api-gateway-proxy';

const find: APIGatewayProxyHandler = async (context) => {
  try {
    await mongodbconnect()
    const invitationRepository: InvitationRepository = new InvitationDataRepository()
    const { code } = context.pathParameters
    let errorMessage = ""
    const result = await invitationRepository.findByCode(code).catch((err) => {
      errorMessage = err.message
      return null
    })
    if (result == null)
      return formatJSONSuccessResponse({
        success: false,
        message: errorMessage
      })
    return formatJSONSuccessResponse({
      success: true,
      payload: result,
      message: "Get invitations by code:" + code
    })
  } catch (err) {
    return formatJSONErrorResponse(err);
  }
}

export const main = middyfy(find);
