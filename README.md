# World of Stories - Alexa Skill

An Alexa skill that tells engaging stories in both English and Hindi with moral lessons for children.

## Features

- **English Stories**: Fox, Owl, Turtle, Elephant, and more
- **Hindi Stories**: Rabbit, Lion, Monkey, Peacock, and more
- **Classic Indian Tales**: Birbal, Tenali Raman, Panchtantra, Vikram-Betaal
- **World Folktales**: Stories from various cultural traditions
- **Session Management**: Ability to repeat the last story told
- **User-Friendly Navigation**: Easy voice commands to browse stories by language

## How to Use

1. Launch the skill by saying "Alexa, open World of Stories"
2. Browse stories by saying "English stories" or "Hindi stories"
3. Request a specific story by saying "Tell me the fox story" or "Tell me the rabbit story in Hindi"
4. Ask to repeat a story by saying "Repeat that"

## Development

This skill is built using the Alexa Skills Kit SDK v2 for Node.js.

### Structure

- `lambda/index.js`: Main skill code with intent handlers and story content
- `models/`: Contains the interaction models for different locales
- `skill.json`: Skill manifest

### Deployment

The skill is deployed using the Alexa Skills Kit CLI and AWS Lambda.

## Contact

For any questions or feedback, please reach out to the skill developer. 