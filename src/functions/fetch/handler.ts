import { APIGatewayProxyHandler } from 'aws-lambda/trigger/api-gateway-proxy';
import { middyfy } from '@libs/lambda';
import { formatJSONErrorResponse, formatJSONSuccessResponse } from '@libs/apiGateway';
import { InvitationRepository } from '@core/domain/repositories/InvitationRepository';
import { InvitationDataRepository } from '@core/data/repositories/InvitationDataRepository';
import { mongodbconnect } from '@utils/mongodb_connection';

const fetch: APIGatewayProxyHandler = async (context) => {
  try {
    await mongodbconnect()
    const invitationRepository: InvitationRepository = new InvitationDataRepository()
    const { user_uuid } = context.headers
    const result = await invitationRepository.fetch(user_uuid)
    return formatJSONSuccessResponse({
      success: true,
      payload: result,
      message: "Get status"
    });
  } catch (err) {
    return formatJSONErrorResponse(err);
  }
}

export const main = middyfy(fetch);
