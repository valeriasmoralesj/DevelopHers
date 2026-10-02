import Portfolio from "../models/Portfolio.js";
import Content from "../models/Portfolio_Content.js";
import Project from "../models/Project.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";


//Add portfolio
export async function addPortfolio(req, res) {
    try {
        const { portfolio_name, template_type, visibility, description } = req.body;
        const user_id = req.params.userId;
        let image, uploadImage = null;

        //If image given
        if(req.file) {

            image = req.file.buffer

            //Upload image to cloudinary
            uploadImage = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder:"portfolio-images",
                        resource_type:"image"
                    },
                    (error, results) => {
                        if(error) {
                            reject(error);
                        }
                        resolve(results);
                    },
                ).end(image)
            });


        } 

        //Get user info
        const user_info = await User.findById(user_id)
       
        //Create portfolio
        const newPortfolio = await Portfolio.create({
            user_info: 
            {
                user_id: user_info._id,
                first_name: user_info.firstname,
                last_name: user_info.lastname
            },
            portfolio_name,
            template_type,
            visibility,
            description,
                image:
            {
                public_id: uploadImage ? uploadImage.public_id : null, 
                secure_url: uploadImage? uploadImage.secure_url : null
            }
        });
    
        if(!newPortfolio) return res.status(400).json({message:"Could Not Create Portfolio"})
        
        return res.status(201).json(newPortfolio);

    } catch (error) {
        console.error("Error in addPortfolio:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Update portfolio (name, etc.)
export async function updatePortfolio(req, res) {
    try {

        const {portfolio_name, template_type, visibility} = req.body
        const portfolioId = req.params.portfolioId
        const portfolio = await Portfolio.findOne().where({_id: portfolioId})

        if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

        const image_publicId = portfolio.image.public_id
        
        let uploadImage = null

        //If there is a new image
        if(req.file) {

            const image = req.file.buffer

            //No previous image uploaded
            if(image_publicId == "" || image_publicId == null) {

                uploadImage = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        {
                            folder:"portfolio-images",
                            resource_type:"image"
                        },
                        (error, results) => {
                            if(error) {
                                reject(error);
                            }
                            resolve(results);
                        },
                    ).end(image)
                });

            //Replace previous image
            } else {

                await cloudinary.uploader.destroy(image_publicId, {invalidate:true})

                uploadImage = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        {
                            public_id:image_publicId,
                            overwrite:true,
                            folder:"portfolio-images",
                            resource_type:"image",
                            invalidate:true
                        },
                        (error, results) => {
                            if(error) {
                                reject(error);
                            }
                            resolve(results);
                        },
                    ).end(image)
                });
            }
        }
        

       //Update 
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            req.params.portfolioId,
            {
                portfolio_name,
                template_type,
                visibility,
                "image.public_id":uploadImage?.public_id,
                "image.secure_url":uploadImage?.secure_url,
            },
            { returnDocument: 'after' }
        );

        if (!updatedPortfolio) return res.status(404).json({ message: "Portfolio not found" });
        res.status(200).json(updatedPortfolio);

    } catch (error) {
        console.error("Error in updatedPortfolio:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Add Portfolio Content
export async function addPortfolioContent(req, res) {
    try{ 
        const {about, contact} = req.body
        const portfolio_id = req.params.portfolioId

        const portfolioContent = await Content.create({
            portfolio_id,
            about,
            contact
        });

        if(portfolioContent) return res.status(201).json(portfolioContent)

    } catch (error) {
         console.error("Error in getAllPortfolios:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
       
}

//Update portfolio content (about, contact, etc.)
export async function updatePortfolioContent(req, res) {
    try {
        const content = await Content.findOneAndUpdate(
            { portfolio_id: req.params.portfolioId },
            req.body,
            { new: true, upsert: true }
        );
        res.status(200).json(content);
    } catch (error) {
        console.error("Error in updatePortfolioContent:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Delete portfolio
export async function deletePortfolio(req, res) {
    try {
        //Delete portfolio from database
        const portfolio = await Portfolio.findOneAndDelete({_id:req.params.portfolioId});
        if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

        //Delete content from database
        const portfolioContent = await Content.findOneAndDelete({portfolio_id:req.params.portfolioId})
        if (!portfolioContent) return res.status(404).json({ message: "Portfolio not found" });

        //Delete portfolio image
        if(portfolio.image.public_id) {
            await cloudinary.uploader.destroy(portfolio.image.public_id, {invalidate:true})
        }
        
        return res.status(200).json({ message: "Portfolio deleted" });
    } catch (error) {
        console.error("Error in deletePortfolio:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Get a user's portfolios
export async function getUserPortfolios(req, res) {
  try {
    const portfolios = await Portfolio.find({
      "user_info.user_id": req.params.userId
    });

    console.log("POPULATED PORTFOLIOS:", portfolios);

    res.status(200).json(portfolios);
  } catch (error) {
    console.error("Error in getUserPortfolios:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



//Get all public portfolios (discover page)
export async function getAllPortfolios(req, res) {
    try {
        const portfolios = await Portfolio.find({ visibility: true })
            .populate("user_id");

        console.log("FIRST ITEM:", portfolios[0]);
        console.log("SECOND ITEM:", portfolios[1]);

        res.status(200).json(portfolios);
    } catch (error) {
        console.error("Error in getAllPortfolios:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Add project
export async function addProject(req, res) {
    try {
        const { project_name, description, link } = req.body;
        const portfolioContent_id = req.params.portfolioContentId

        const portfolioContent = await Content.findOne().where({_id: portfolioContent_id})
        if(!portfolioContent) return res.json({message:"Could not find portfolio content"})
       
        //Add new project
        portfolioContent.projects.push({
            project_name, description, link
        })

        portfolioContent.save()
        return res.json(portfolioContent)

    } catch (error) {
        console.error("Error in addProject:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Update project
export async function updateProject(req, res) {
    try {
        const {project_name, description, link} = req.body
        const projectContentId = req.params.projectContentId
        const projectId = req.params.projectId
       
        //Find the project content
        const projectContent = await Content.findOne().where({_id:projectContentId})

        //Get specific project
        const project = await projectContent.projects.id(projectId)

       //Update fields
        if(project_name) project.project_name = project_name
        if(description) project.description = description
        if(link) project.link = link
        projectContent.save()
        
        return res.status(200).json(projectContent)
         
    } catch (error) {
        console.error("Error in updateProject:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Delete project
export async function deleteProject(req, res) {
    try {
        const projectContentId = req.params.projectContentId
        const projectId = req.params.projectId

        const projectContent = await Content.findOne().where({_id:projectContentId})
        await projectContent.projects.pull(projectId)//Delte project
        projectContent.save()

        return res.status(200).json({message:"Project deleted"})
       
    } catch (error) {
        console.error("Error in deleteProject:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Get portfolio projects
export async function getPortfolioProjects(req, res) {
    try {
        const portfolioContent = await Content.findOne({ _id: req.params.portfolioContentId });
        const projects = portfolioContent.projects
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error in getPortfolioProjects:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Search portfolios by name
export async function searchPortfolios(req, res) {
    try {
        const { name } = req.query;

        const portfolios = await Portfolio.find({ visibility: true })
            .populate({ 
                path: "user_id", 
                match: { 
                    $or: [
                        { firstname: { $regex: name, $options: "i" } },
                        { lastname: { $regex: name, $options: "i" } }
                    ] 
                }, 
                select: "firstname lastname" 
            });

        const filtered = portfolios.filter(p => p.user_id !== null);
        res.status(200).json(filtered);

    } catch (error) {
        console.error("Error in searchPortfolios:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Add skill
export async function addSkill(req, res) {
    try {
        const { skill } = req.body;
        const content = await Content.findOneAndUpdate(
            { portfolio_id: req.params.portfolioId },
            { $push: { skills: skill } },
            { new: true }
        );
        if (!content) return res.status(404).json({ message: "Portfolio content not found" });
        res.status(200).json(content);
    } catch (error) {
        console.error("Error in addSkill:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Delete skill
export async function deleteSkill(req, res) {
    try {
        const { skill } = req.body;
        const content = await Content.findOneAndUpdate(
            { portfolio_id: req.params.portfolioId },
            { $pull: { skills: skill } },
            { new: true }
        );
        if (!content) return res.status(404).json({ message: "Portfolio content not found" });
        res.status(200).json(content);
    } catch (error) {
        console.error("Error in deleteSkill:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Add program
export async function addProgram(req, res) {
    try {
        const { program } = req.body;
        const content = await Content.findOneAndUpdate(
            { portfolio_id: req.params.portfolioId },
            { $push: { programs: program } },
            { new: true }
        );
        if (!content) return res.status(404).json({ message: "Portfolio content not found" });
        res.status(200).json(content);
    } catch (error) {
        console.error("Error in addProgram:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Delete program
export async function deleteProgram(req, res) {
    try {
        const { program } = req.body;
        const content = await Content.findOneAndUpdate(
            { portfolio_id: req.params.portfolioId },
            { $pull: { programs: program } },
            { new: true }
        );
        if (!content) return res.status(404).json({ message: "Portfolio content not found" });
        res.status(200).json(content);
    } catch (error) {
        console.error("Error in deleteProgram:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}