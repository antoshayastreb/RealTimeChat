const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const avatars = [
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-007.jpg",
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-006.jpg",
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-005.jpg",
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-013.jpg",
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-012.jpg",
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-010.jpg",
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-011.jpg",
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-009.jpg",
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-008.jpg",
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-003.jpg",
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-004.jpg",
  "https://www.discordavatars.com/wp-content/uploads/2020/09/among-us-avatar-002.jpg"
]


//Регистрация
router.post("/register", async (req, res) => {
  try {
    //Генерация хэша пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const oldUser = await User.findOne({username: req.body.username})
    
    if (oldUser === null){
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            profilePicture: avatars[Math.floor(Math.random()*avatars.length)]
          });
      
          const user = await newUser.save();
          res.status(200).json(user);
    }
    else{
        res.status(500).json("Пользователь с таким логином уже существует!")
    }

    
  } catch (err) {
    res.status(500).json(err)
  }
});

//Авторизация
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(!user) return res.status(404).json("Пользователь не найден!");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).json("Неверный пароль!")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;