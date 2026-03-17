import AuditLog from "../models/auditLog.model.js";

export const createAuditLog = async ({
  user,
  action,
  module,
  recordId,
  oldData,
  newData,
  req,
}) => {
  try {
    
    await AuditLog.create({
      userId: user?._id,
      userName: user?.name,
      action,
      module,
      recordId,
      oldData,
      newData,
      ipAddress: req?.ip,
    });
  } catch (error) {
    console.error("Audit log error:", error);
  }
};
