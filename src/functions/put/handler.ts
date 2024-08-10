import { InvitationDataRepository } from '@core/data/repositories/InvitationDataRepository';
import { InvitationRepository } from '@core/domain/repositories/InvitationRepository';
import { formatJSONErrorResponse, formatJSONSuccessResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'
import { mongodbconnect } from '@utils/mongodb_connection';
import { InvitationRequest } from '@functions/put/InvitationRequest';

const put: ValidatedEventAPIGatewayProxyEvent<InvitationRequest> = async (context) => {
  try {
    await mongodbconnect()
    const invitationRepository: InvitationRepository = new InvitationDataRepository()

    const invitationRequest: InvitationRequest = context.body as InvitationRequest
    const { user_uuid } = context.headers

    const result = await invitationRepository
      .setGuestUUID(user_uuid, invitationRequest.invitationId)
      .catch((_) => { return false })

    return formatJSONSuccessResponse({
      success: true,
      payload: result,
      message: "[GuestUUID: " + user_uuid + ", InvitationID: " + invitationRequest.invitationId + "]"
    })

  } catch (err) {
    return formatJSONErrorResponse(err);
  }
}

export const main = middyfy(put);
