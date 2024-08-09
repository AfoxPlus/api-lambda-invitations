import { Invitation } from "@core/domain/entities/Invitation";
import { InvitationRepository } from "@core/domain/repositories/InvitationRepository";
import { InvitationMongoDBSource } from "@core/data/sources/mongoDB/InvitationMongoDBSource";

export class InvitationDataRepository implements InvitationRepository {
    private dataSouce: InvitationMongoDBSource
    constructor() { this.dataSouce = new InvitationMongoDBSource() }

    fetch = async (guestUUID: string): Promise<Invitation[]> => await this.dataSouce.fetch(guestUUID)
    findByCode = async (code: string): Promise<Invitation> => await this.dataSouce.findByCode(code)

}