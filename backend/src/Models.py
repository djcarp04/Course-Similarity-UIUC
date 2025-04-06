from sentence_transformers import SentenceTransformer
import pandas as pd
import os
from pydantic import BaseModel

class Course(BaseModel):
    subject: str
    number: str
    name: str

class NLPResponse(BaseModel):
    courses: list[Course]
    message: str

script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, 'updated-course-catalog.csv')
df = pd.read_csv(file_path)

sentences = df['Description'].tolist() #All the course descriptions


#Map description->score
    #then we can go back to the df and extract the course number

def Sbert(description: str) -> NLPResponse:
    print("IN SBERT FUNCTION")
    #Good cos similarity score is > 0.65
    model = SentenceTransformer("all-MiniLM-L6-v2")
    map = {}
    
    s_temp = sentences
    s_temp.insert(0,description) #Insert requested description to the front

    n = len(s_temp)

    map = {key: 0 for key in s_temp}

    print("HERE1")
    embeddings = model.encode(sentences)
    similarity_matrix = model.similarity(embeddings, embeddings)
    similar_to_sentence1 = similarity_matrix[0]

    for i in range(0,n):
        map[s_temp[i]] = similar_to_sentence1[i] #Description -> score

    print("HERE2")
    #Now only take similarities where the value is > 0.65    
    for i in range(0,n):
        
        ''''
        if i in range(0,20):
            print(f'{s_temp[i]}: + {map[s_temp[i]]}')
        '''
        
        if s_temp[i] in map == False:
            print(f'Value not in map: {s_temp[i]}')
            continue
        
        if map[s_temp[i]] < 0.6: #PROBLEM: IF CLASSES HAVE MATCHING DESCRIPTIONS AND ONE GETS REMOVED THEN THE VALUE DOES NOT EXIST SO REMOVE ALL MATCHING DESCRIPTIONS
            del map[s_temp[i]] #Will delete the K,V pair associated with the description therefore it will not mess up anything else

    #print(f'Remaining similar courses: {len(list(map.keys()))}')
            
    '''
    json({
    'subject': subject
    'number': number
    'name': name
    })
    '''
    print("HERE3")
            
    courses_model = []

    descriptions = list(map.keys())

    names = []
    subjects = []
    numbers = []
    for i in descriptions:
        subject = str(df.loc[df['Description'] == i, 'Subject'])
        #subject = str(df.loc[df['Description'] == i, 'Subject'].values[0])

        name = str(df.loc[df['Description'] == i, 'Name'])
        #name = str(df.loc[df['Description'] == i, 'Name'].values[0])

        number = str(df.loc[df['Description'] == i, 'Number'])
        #number = str(df.loc[df['Description'] == i, 'Number'].values[0])

        subjects.append(subject)
        numbers.append(number)
        names.append(name)
    
    print("HERE4")

    #json
    for i in range(0,len(descriptions)):
        print(f"Subject: {subjects[i]}, Name: {names[i]}, Number: {numbers[i]}")
        c = Course(name=names[i], subject=subjects[i], number=numbers[i]) #all strings confirmed?????
        courses_model.append(c)
    
    print("ABOUT TO RETURN")

    return NLPResponse (
        courses=courses_model,
        message="Finished searching for courses!"
    )
    


#Example:
'''
# The sentences to encode

model = SentenceTransformer("all-MiniLM-L6-v2")


sentences = [
    "First course in calculus and analytic geometry; basic techniques of differentiation and integration with applications including curve sketching; antidifferentation, the Riemann integral, fundamental theorem, exponential and trigonometric functions.",
    "Second course in calculus and analytic geometry: techniques of integration, conic sections, polar coordinates, and infinite series.",
    "Presents the fundamental areas of anthropological analysis through a series of comparative cases that emphasize social and cultural relations in global contexts. Directs attention to the anthropological history of global empires and colonial states, their cultural exchanges, and contemporary studies of culture, society, and globalization.",
    "Introduction to mathematical statistics that develops probability as needed; includes the calculus of probability, random variables, expectation, distribution functions, central limit theorem, point estimation, confidence intervals, and hypothesis testing.",
    "Classical thermodynamics through the second law; system and control-volume analyses of thermodynamic processes; irreversibility and availability; relations for ideal gas mixtures.",
    "Topics include trigonometric and exponential functions; limits and differentiation, rules of differentiation, maxima, minima and optimization; curve sketching, integration, anti-derivatives, fundamental theorem of calculus. Properties of definite integrals and numerical methods. Applications to life, managerial and social sciences."
]

#MATH 220
#MATH 231
#ANTH 101
#STAT 400
#ME 200
#MA 16010 Purdue


# 2. Calculate embeddings by calling model.encode()
embeddings = model.encode(sentences)
print(embeddings.shape)
# [3, 384]

# 3. Calculate the embedding similarities
similarities = model.similarity(embeddings, embeddings)
print(similarities)
'''