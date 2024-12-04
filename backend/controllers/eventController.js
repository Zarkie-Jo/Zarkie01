const Event = require('../models/events');
const Join = require('../models/join');

exports.createEvent = async (req, res) => {
    try {
        const { title, description, startDate, endDate, location } = req.body;
        const newEvent = new Event({ title, description, startDate, endDate, location, isDeleted: false });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: 'Error creating event', error });
    }
};

exports.getAvailableEvents = async (req, res) => {
  try {
    const currentDate = new Date();
    const events = await Event.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      isDeleted: false
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching events', error });
  }
};

exports.submitJoinRequest = async (req, res) => {
  try {
    const newJoinRequest = new Join(req.body);
    await newJoinRequest.save();
    res.status(201).json(newJoinRequest);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting join request', error });
  }
};


exports.getUpcomingEvents = async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingEvents = await Event.find({
      startDate: { $gt: currentDate },
      isDeleted: false
    });
    res.status(200).json(upcomingEvents);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching upcoming events', error });
  }
};
