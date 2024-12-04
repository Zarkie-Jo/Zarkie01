const Join = require("../models/join");
const Event = require("../models/Event");
const nodemailer = require("nodemailer");

// Create email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "your-email@gmail.com", // Update with your email
    pass: "your-app-password", // Update with your app password
  },
});

exports.getAllJoinRequests = async (req, res) => {
  try {
    const requests = await Join.find()
      .populate("event", "title startDate endDate location")
      .sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching join requests", error: error.message });
  }
};

exports.updateJoinRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAccept } = req.body;

    const joinRequest = await Join.findById(id).populate("event", "title");
    if (!joinRequest) {
      return res.status(404).json({ message: "Join request not found" });
    }

    joinRequest.isAccept = isAccept;
    await joinRequest.save();

    // Send email notification
    if (isAccept) {
      const mailOptions = {
        from: "your-email@gmail.com", // Update with your email
        to: joinRequest.email,
        subject: "تم قبول طلب انضمامك للفعالية",
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif;">
            <h2>مرحباً ${joinRequest.fullName}،</h2>
            <p>يسعدنا إخبارك بأنه تم قبول طلب انضمامك لفعالية "${joinRequest.event.title}".</p>
            <p>نتطلع لرؤيتك في الفعالية!</p>
            <br>
            <p>مع أطيب التحيات،</p>
            <p>فريق العمل</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json(joinRequest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating join request", error: error.message });
  }
};
