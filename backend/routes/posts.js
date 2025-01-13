const express = require("express");
const multer = require("multer");
const path = require("path");
const Post = require("../models/post");
const user = require("../models/user");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

//게시글 추가
router.post("/add", upload.single("image"), async (req, res) => {
    const { title, content, userId } = req.body; // userId 추가
    const image = req.file ? req.file.path : null;

    try {
        const newPost = new Post({
            title,
            content,
            image,
            user: userId, // userId 저장
        });

        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//게시글 목록 조회
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "name profileImage"); // 사용자 이름과 프로필 사진만 가져옴
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// 게시글 삭제
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params; // URL에서 게시글 ID 가져오기

    try {
        // 게시글 찾기
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // 게시글 삭제
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;