import mongoose, { Schema, Document, Types } from "mongoose";

export interface InvitationDocument extends Document {
    _id: Types.ObjectId,
    guestUUID?: String,
    guest: String,
    urlBanner: String,
    code: String,
    title: String,
    date: String,
    address: String,
    time: String,
    gate: String,
    table: String,
    ulrBarcode: String,
    participants: String,
    isActive: Boolean
}

const InvitationSchema: Schema = new Schema({
    code: { type: String },
    guestUUID: { type: String },
    guest: { type: String },
    urlBanner: { type: String },
    title: { type: String },
    date: { type: String },
    address: { type: String },
    time: { type: String },
    gate: { type: String },
    table: { type: String },
    ulrBarcode: { type: String },
    participants: { type: String },
    isActive: { type: Boolean, default: true }
})

export const InvitationModel = mongoose.models.Invitation || mongoose.model<InvitationDocument>('Invitation', InvitationSchema, 'Invitation')