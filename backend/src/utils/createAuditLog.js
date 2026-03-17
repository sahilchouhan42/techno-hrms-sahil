import AuditLog from "../models/auditLog.model.js";

export const createAuditLog = async ({
  userId,
  userName,
  action,
  module,
  recordId,
  oldData,
  newData,
  req
}) => {
  try {

    await AuditLog.create({
      userId,
      userName,
      action,
      module,
      recordId,
      oldData,
      newData,
      ipAddress: req.ip
    });

  } catch (error) {
    console.log("Audit log error:", error.message);
  }
};