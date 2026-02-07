import multer from 'multer'
const storage = multer.diskStorage({})
export const upload = multer({ storage: storage })

// this setup explains use diskstroge but I don’t care where or how you name the file
// we can improve
