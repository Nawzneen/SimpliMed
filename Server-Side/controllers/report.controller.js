const Abstract = require("../models/abstract");
const Interaction = require("../models/interaction");
const Feedback = require("../models/feedback");
const User = require("../models/user");
const study = require("../study/studyStatus.json");

exports.getUsers = async (req, res) => {
  try {
    console.log("get feedback report");
    const feedbacks = await Feedback.find();
    // console.log(feedbacks);
    const users = await User.find(); // Fetch all users from the databas
    const numberOfUsers = await User.countDocuments();
    const numberOfFeedbacks = await Feedback.countDocuments();
    console.log(
      "number of users",
      numberOfUsers,
      "number of feedbacks",
      numberOfFeedbacks
    );

    res.json({ users: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.getUsersFeedbacks = async (req, res) => {
  try {
    const aggregationPipeline = [
      {
        $lookup: {
          from: "feedbacks",
          localField: "_id",
          foreignField: "userID",
          as: "feedbacks",
        },
      },
      { $unwind: "$feedbacks" },
      {
        $group: {
          _id: {
            username: "$username",
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$feedbacks.created" },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.username",
          numberOfFeedbacks: {
            $push: {
              date: "$_id.date",
              count: "$count",
            },
          },
        },
      },
    ];
    const result = await User.aggregate(aggregationPipeline);

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getUsersWithFeedbacks = async (req, res) => {
  try {
    const aggregationPipeline = [
      [
        {
          $lookup: {
            from: "feedbacks",
            localField: "_id",
            foreignField: "userID",
            as: "feedbacks",
          },
        },
        // { $unwind: "$feedbacks" },
        // {
        //   $group: {
        //     _id: {
        //       username: "$username",
        //       date: {
        //         $dateToString: {
        //           format: "%Y-%m-%d",
        //           date: "$feedbacks.created",
        //         },
        //       },
        //     },
        //     count: { $sum: 1 },
        //     feedbacks: { $push: "$feedbacks" },
        //   },
        // },
        // {
        //   $group: {
        //     _id: "$_id.username",
        //     feedbacks: {
        //       $push: {
        //         date: "$_id.date",
        //         count: "$count",
        //         feedbacks: "$feedbacks",
        //       },
        //     },
        //   },
        // },
      ],
    ];

    const result = await User.aggregate(aggregationPipeline);

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// exports.getFeedbackReport = async (req, res) => {
//   try {
//     const username = req.query.username;
//     const aggregationQuery = [
//       {
//         $lookup: {
//           from: "feedbacks",
//           localField: "_id",
//           foreignField: "userID",
//           as: "feedbacks",
//         },
//       },
//       { $unwind: "$feedbacks" },
//       {
//         $group: {
//           _id: {
//             username: "$username",
//             date: {
//               $dateToString: { format: "%Y-%m-%d", date: "$feedbacks.created" },
//             },
//           },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $group: {
//           _id: "$_id.username",
//           results: { $push: { date: "$_id.date", count: "$count" } },
//         },
//       },
//     ];
//     const results = await Feedback.aggregate(aggregationQuery);
//     res.json({ results });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "An error occured" });
//   }

//   db.users.aggregate([
//     {
//       $lookup: {
//         from: "feedbacks",
//         localField: "_id",
//         foreignField: "userID",
//         as: "feedbacks",
//       },
//     },
//     { $unwind: "$feedbacks" },
//     {
//       $group: {
//         _id: {
//           username: "$username",
//           date: {
//             $dateToString: { format: "%Y-%m-%d", date: "$feedbacks.created" },
//           },
//         },
//         count: { $sum: 1 },
//       },
//     },
//     {
//       $group: {
//         _id: "$_id.username",
//         results: { $push: { date: "$_id.date", count: "$count" } },
//       },
//     },
//   ]);
// };
