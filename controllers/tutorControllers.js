const gittutorial =   (req,res)=>{
    res.sendFile('/home/samuel/project/note/git.html');
};

const graphqltutorial = (req,res)=>{
    res.sendFile('/home/samuel/project/note/graphql.html');
}

const javascripttutorial = (req,res)=>{
    res.sendFile('/home/samuel/project/note/javascript.html');
}

const homepage = (req,res)=>{
    res.redirect('/javascript');    
}

module.exports = {
    gittutorial,graphqltutorial,javascripttutorial,homepage
}