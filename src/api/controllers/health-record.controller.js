const HealthRecord = require('../models/heath-record.model');

/**
 * Create new HealthRecord
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const healthRecord = new HealthRecord(req.body);
    const savedRecord = await healthRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing HealthRecord
 * @public
 */
exports.update = async (req, res, next) => {
  const { recordId } = req.params;
  try {
    const record = await HealthRecord.findById(recordId);
    if (!record) {
      return res.status(404).send('HealthRecord not found');
    }

    Object.assign(record, req.body);
    const updatedRecord = await record.save();
    res.status(200).json(updatedRecord);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete HealthRecord
 * @public
 */
exports.remove = async (req, res, next) => {
  const { recordId } = req.params;
  try {
    const record = await HealthRecord.findById(recordId);
    if (!record) {
      return res.status(404).send('HealthRecord not found');
    }

    await record.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Get HealthRecord by ID
 * @public
 */
exports.get = async (req, res, next) => {
  const { recordId } = req.params;
  try {
    const record = await HealthRecord.findById(recordId).populate('patient').populate('previousRecord');
    if (!record) {
      return res.status(404).send('HealthRecord not found');
    }

    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
};

/**
 * List HealthRecords
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const { page = 1, perPage = 30, patientId, from, to, ...filters } = req.query;

    // Xây dựng điều kiện lọc
    const match = {};
    if (patientId) {
      match.patient = patientId;
    }
    if (from || to) {
      match.visitDate = {};
      if (from) match.visitDate.$gte = new Date(from);
      if (to) match.visitDate.$lte = new Date(to);
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10),
      sort: { createdAt: -1 },
    };

    const data = await HealthRecord.paginate({ ...match, ...filters }, options);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get HealthRecords by User ID with pagination
 * @public
 */
exports.getByUserId = async (req, res, next) => {
    const { userId } = req.params;
    const { page = 1, perPage = 30 } = req.query;
  
    try {
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(perPage, 10),
        sort: { createdAt: -1 },
        populate: ['patient', 'previousRecord']
      };
  
      const data = await HealthRecord.paginate({ patient: userId }, options);
      if (!data.docs || data.docs.length === 0) {
        return res.status(404).send('No HealthRecords found for this user');
      }
  
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };