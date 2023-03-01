const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config({ path: "../.env" });

const apiUrl = `https://${process.env.OPENAI_SERVICE_NAME}.openai.azure.com`;
const apiKey = process.env.OPENAI_API_KEY;
const deploymentName = process.env.DEPLOYMENT_NAME;
const apiVersion = process.env.OPENAI_API_VERSION;
// Sample Input data
const inputData = [
  {
    id: "1",
    title: "LeBron James",
    content:
      "LeBron James is one of the greatest basketball players of all time. Born in Akron, Ohio, James was drafted into the NBA straight out of high school in 2003. He has won four NBA championships, four NBA MVP awards, and two Olympic gold medals. James is known for his incredible athleticism, his ability to score from anywhere on the court, and his leadership on and off the court. He is also a philanthropist who has used his platform to support various causes, including education and social justice.",
  },
  {
    id: "2",
    title: "Serena Williams",
    content:
      "Serena Williams is widely regarded as one of the greatest tennis players of all time. Born in Saginaw, Michigan, Williams turned professional in 1995 and has won 23 Grand Slam singles titles and 14 Grand Slam doubles titles. She is known for her powerful serve, her speed and agility on the court, and her mental toughness. Williams has also been a vocal advocate for women's rights and social justice.",
  },
  {
    id: "3",
    title: "Usain Bolt",
    content:
      "Usain Bolt is a retired Jamaican sprinter who is widely regarded as the fastest person of all time. He has won eight Olympic gold medals and 11 World Championships gold medals, and has set numerous world records in the 100 meters, 200 meters, and 4x100 meters relay. Bolt is known for his incredible speed, his showmanship on the track, and his fun-loving personality off the track.",
  },
  {
    id: "4",
    title: "Michael Phelps",
    content:
      "Michael Phelps is a retired American swimmer who is widely regarded as the greatest swimmer of all time. He has won 23 Olympic gold medals and holds several world records in swimming. Phelps is known for his incredible work ethic, his mental toughness, and his ability to perform under pressure. He has also been open about his struggles with depression and has used his platform to raise awareness about mental health.",
  },
  {
    id: "5",
    title: "Lionel Messi",
    content:
      "Lionel Messi is an Argentine soccer player who is widely regarded as one of the greatest soccer players of all time. He has won numerous awards throughout his career, including seven Ballon d'Or awards and four Champions League titles. Messi is known for his incredible dribbling skills, his ability to score from anywhere on the field, and his humility off the field.",
  },
  {
    id: "6",
    title: "Tom Brady",
    content:
      "Tom Brady is an American football quarterback who is widely regarded as one of the greatest quarterbacks of all time. He has won seven Super Bowl championships and has been named the Super Bowl MVP five times. Brady is known for his incredible accuracy, his ability to read defenses, and his leadership on and off the field. He is also a philanthropist who has used his platform to support various causes, including education and health.",
  },
  {
    id: "7",
    title: "Simone Biles",
    content:
      "Simone Biles is an American gymnast who is widely regarded as one of the greatest gymnasts of all time. She has won 30 Olympic and World Championship medals, including 19 gold medals. Biles is known for her incredible athleticism, her mental toughness, and her ability to perform under pressure. She has also been a vocal advocate for mental health.",
  },
  {
    id: "8",
    title: "LeBron James",
    content:
      "LeBron James is one of the greatest basketball players of all time. Born in Akron, Ohio, James was drafted into the NBA straight out of high school in 2003. He has won four NBA championships, four NBA MVP awards, and two Olympic gold medals. James is known for his incredible athleticism, his ability to score from anywhere on the court, and his leadership on and off the court. He is also a philanthropist who has used his platform to support various causes, including education and social justice.",
  },
  {
    id: "9",
    title: "Serena Williams",
    content:
      "Serena Williams is widely regarded as one of the greatest tennis players of all time. Born in Saginaw, Michigan, Williams turned professional in 1995 and has won 23 Grand Slam singles titles and 14 Grand Slam doubles titles. She is known for her powerful serve, her speed and agility on the court, and her mental toughness. Williams has also been a vocal advocate for women's rights and social justice.",
  },
  {
    id: "10",
    title: "Usain Bolt",
    content:
      "Usain Bolt is a retired Jamaican sprinter who is widely regarded as the fastest person of all time. He has won eight Olympic gold medals and 11 World Championships gold medals, and has set numerous world records in the 100 meters, 200 meters, and 4x100 meters relay. Bolt is known for his incredible speed, his showmanship on the track, and his fun-loving personality off the track.",
  },
  {
    id: "11",
    title: "Michael Phelps",
    content:
      "Michael Phelps is a retired American swimmer who is widely regarded as the greatest swimmer of all time. He has won 23 Olympic gold medals and holds several world records in swimming. Phelps is known for his incredible work ethic, his mental toughness, and his ability to perform under pressure. He has also been open about his struggles with depression and has used his platform to raise awareness about mental health.",
  },
  {
    id: "12",
    title: "Lionel Messi",
    content:
      "Lionel Messi is an Argentine soccer player who is widely regarded as one of the greatest soccer players of all time. He has won numerous awards throughout his career, including seven Ballon d'Or awards and four Champions League titles. Messi is known for his incredible dribbling skills, his ability to score from anywhere on the field, and his humility off the field.",
  },
  {
    id: "13",
    title: "Tom Brady",
    content:
      "Tom Brady is an American football quarterback who is widely regarded as one of the greatest quarterbacks of all time. He has won seven Super Bowl championships and has been named the Super Bowl MVP five times. Brady is known for his incredible accuracy, his ability to read defenses, and his leadership on and off the field. He is also a philanthropist who has used his platform to support various causes, including education and health.",
  },
  {
    id: "14",
    title: "Simone Biles",
    content:
      "Simone Biles is an American gymnast who is widely regarded as one of the greatest gymnasts of all time. She has won 30 Olympic and World Championship medals, including 19 gold medals. Biles is known for her incredible athleticism, her mental toughness, and her ability to perform under pressure. She has also been a vocal advocate for mental health.",
  },
  {
    id: "15",
    title: "Barack Obama",
    content:
      "Barack Obama served as the 44th president of the United States from 2009 to 2017. Prior to his presidency, Obama served as a senator from Illinois. He is known for his advocacy of healthcare reform, economic stimulus legislation, and climate change legislation. He received the Nobel Peace Prize in 2009 for his efforts to strengthen international diplomacy and cooperation between peoples.",
  },
  {
    id: "16",
    title: "Oprah Winfrey",
    content:
      "Oprah Winfrey is an American media executive, actress, talk show host, television producer, and philanthropist. She is best known for her talk show The Oprah Winfrey Show, which was the highest-rated television program of its kind in history. She has also acted in several films, and has published multiple books, including a memoir and a cookbook. In addition to her media and entertainment career, Winfrey is also a noted philanthropist, having donated millions of dollars to charitable causes.",
  },
  {
    id: "17",
    title: "Bill Gates",
    content:
      "Bill Gates is an American entrepreneur and philanthropist, best known as the co-founder of Microsoft Corporation, the world's largest personal-computer software company. Gates is one of the best-known entrepreneurs of the personal computer revolution and is consistently ranked as one of the world's wealthiest people. He is also a noted philanthropist, having donated billions of dollars to charitable causes through the Bill and Melinda Gates Foundation, which he co-founded with his wife.",
  },
  {
    id: "18",
    title: "Angelina Jolie",
    content:
      "Angelina Jolie is an American actress, filmmaker, and humanitarian. She is best known for her roles in films such as Girl, Interrupted, Mr. and Mrs. Smith, and Maleficent. Jolie has also directed and produced several films, and has been recognized for her humanitarian work, particularly in the areas of refugees and human rights. She has served as a Goodwill Ambassador for the United Nations High Commissioner for Refugees, and has received numerous awards for her humanitarian work.",
  },
  {
    id: "19",
    title: "Elon Musk",
    content:
      "Elon Musk is a South African-born American entrepreneur and businessman, best known as the founder, CEO, and lead designer of SpaceX, co-founder, CEO, and product architect of Tesla, and co-founder and CEO of Neuralink and The Boring Company. Musk is also known for his work in the areas of renewable energy and sustainable transportation, and has been recognized for his contributions to the field of space exploration.",
  },
  {
    id: "20",
    title: "Michelle Obama",
    content:
      "Michelle Obama is an American attorney, author, and the wife of Barack Obama, the 44th President of the United States. She served as the First Lady of the United States from 2009 to 2017, and is known for her advocacy of education, healthy eating, and physical fitness. Obama is also a noted author, having written several books, including a memoir, Becoming, which has sold millions of copies worldwide.",
  },
  {
    id: "21",
    title: "Jasmine Stevens",
    content:
      "Jasmine is a free-spirited traveler who has visited 50+ countries and counting. Her passion for exploration and photography has led her to capture stunning shots of landscapes and cultures from all corners of the globe.",
  },
  {
    id: "22",
    title: "Ethan Clarke",
    content:
      "Ethan is a tech enthusiast and avid gamer. He spends most of his time researching the latest gadgets and video games, and has built his own custom PC rig. When he's not gaming, he enjoys hiking and exploring the great outdoors.",
  },
  {
    id: "23",
    title: "Aria Patel",
    content:
      "Aria is a foodie and culinary expert, with a particular interest in exotic flavors and spices. She has a blog where she shares her recipes and cooking tips, and has been featured in several food magazines and TV shows.",
  },
  {
    id: "24",
    title: "Kai Wong",
    content:
      "Kai is an artist and painter, with a unique style that blends traditional techniques with modern abstract elements. His work has been exhibited in galleries and museums around the world, and has won several awards and accolades.",
  },
  {
    id: "25",
    title: "Mila Rodriguez",
    content:
      "Mila is a social activist and advocate for women's rights. She founded a non-profit organization that provides education and resources for women in underprivileged communities, and has been recognized for her work by several humanitarian organizations.",
  },
  {
    id: "26",
    title: "Leo Kim",
    content:
      "Leo is a professional skateboarder and extreme sports athlete. He has competed in several international competitions and has won multiple championships. He is also known for his daring stunts and creative tricks that push the boundaries of the sport.",
  },
  {
    id: "27",
    title: "Zoe Green",
    content:
      "Zoe is a nature lover and wildlife photographer. She has traveled to some of the most remote and beautiful places on earth to capture stunning images of animals in their natural habitats. Her work has been featured in several nature magazines and publications.",
  },
  {
    id: "28",
    title: "Max Chen",
    content:
      "Max is a successful entrepreneur and business owner. He started his own company from scratch and has grown it into a multi-million dollar enterprise. He is also a mentor and advisor to other aspiring entrepreneurs, and is often invited to speak at business conferences and events.",
  },
  {
    id: "29",
    title: "Sofia Johnson",
    content:
      "Sofia is a fashion designer and style icon. She has her own clothing line that combines classic elegance with modern trends, and has been worn by several celebrities and fashion influencers. She also hosts her own fashion show and is a judge on a popular reality TV competition.",
  },
  {
    id: "30",
    title: "David Lee",
    content:
      "David is a scientist and researcher, with a focus on artificial intelligence and machine learning. He has published several papers and patents, and has won several awards for his groundbreaking work in the field. He is also a professor at a leading university and a sought-after speaker at tech conferences and events.",
  },
];

// Create a function to generate embeddings over the content and title field
async function generateEmbeddings(inputData) {
  const embeddings = await Promise.all(
    inputData.map(async (data) => {
      const requestData = {
        input: data.title,
        engine: "text-embedding-ada-002",
      };
      try {
        const titleResponse = await axios.post(
          `${apiUrl}/openai/deployments/${deploymentName}/embeddings?api-version=${apiVersion}`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
          }
        );

        requestData.input = data.content;
        const contentResponse = await axios.post(
          `${apiUrl}/openai/deployments/${deploymentName}/embeddings?api-version=${apiVersion}`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
          }
        );

        // ada-002 model contains 1536 dimensions
        const titleVector = titleResponse.data.data[0].embedding.slice(0, 1536);
        const contentVector = contentResponse.data.data[0].embedding.slice(
          0,
          1536
        );

        return {
          id: data.id,
          title: data.title,
          titleVector,
          content: data.content,
          contentVector,
        };
      } catch (error) {
        console.error(error);
      }
    })
  );
  return embeddings;
}

// Call the function and log the output
generateEmbeddings(inputData).then((embeddings) => {
  const docsVectors = embeddings.map((doc) => ({
    ...doc,
    "@search.action": "upload",
  }));
  console.log(docsVectors);

  // Write embeddings to a JSON file
  const outputFilePath = "output/docVectors.json";
  const jsonData = JSON.stringify(docsVectors);
  fs.writeFile(outputFilePath, jsonData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Embeddings saved to ${outputFilePath}`);
    }
  });
});
