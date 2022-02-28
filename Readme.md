# paper-mario-randomizer
Frontend angular web app to be used with the Open World Paper Mario Randomizer by IceBound777 and clover
# How to run locally
1. Install the latest stable version of Node/npm
2. Open the project and navigate to /app/ with a terminal
3. > npm install one time to get all the packages
4. > ng serve to run localy on localhost:4200

# Updating the starrod bps served
- There are 2 files for each version in the asset folder. starrod_debug_x and starrod_x (where x = version number).
- The debug file is served in the UAT environment and has debug variables ingame, starrod_x is the production version without debug menu
- Each environment.ts file has a variable "currentModVersion" that specifies which file to take when generating a new mod
- For new features in the mod file or major changes, a new version of the file should be created, and currentModVersion should be bumped.
  Generated seeds know the mod version they used when being generated and won't use new versions.
- For minor fixes, if we want the user to be able to repatch already generated seeds, to fix bugs for example, the latest files can be overwritten, and currentModVersion not bumped.

# How to build
> ng build -c uat 
> ng build -c production

uat or production specificies the environment.ts file used and the build config from angular.json.
Builds are now automated for dev and master branches tough, so making a manual build should be rarely necessary

# Project dependancies
Only the homepage will work without the other projects. 
"pm64openworldrandomizer_website" is required for api calls
"PMR-SeedGenerator" is required to generate seeds
"PM64OpenWorldRandomizer" is required to generate the latest starrod mod bps.
These projects are NOT open source and are not planned to be in the near future.