const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('user', {
  // Add your Sequelize fields here
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    userType: {
      type: Sequelize.ENUM('STUDENT','TEACHER'),
      allowNull: false,
      defaultValue: 'STUDENT'
    },
    isStudent: {
      type: Sequelize.VIRTUAL,
      get(){
        return this.userType==='STUDENT'
      }

    },
    isTeacher: {
      type: Sequelize.VIRTUAL,
      get(){
        return this.userType==='TEACHER'
      }
    }
});

User.findUnassignedStudents = function(){
  return User.findAll({
    where: {
      userType: 'STUDENT',
      mentorId: null
    }
  })
}

User.findTeachersAndMentees = function(){
  return User.findAll({
    where: {
        userType: 'TEACHER'
    },
    include: {
      model: User,
      as: 'mentees'
    }
  })
}

/**
 * We've created the association for you!
 *
 * A user can be related to another user as a mentor:
 *       SALLY (mentor)
 *         |
 *       /   \
 *     MOE   WANDA
 * (mentee)  (mentee)
 *
 * You can find the mentor of a user by the mentorId field
 * In Sequelize, you can also use the magic method getMentor()
 * You can find a user's mentees with the magic method getMentees()
 */

User.belongsTo(User, { as: 'mentor' });
User.hasMany(User, { as: 'mentees', foreignKey: 'mentorId' });

module.exports = User;
