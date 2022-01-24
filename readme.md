# LikeCoin-Helper-Discord

A simple helper for getting informations about LikeCoin on Discord.

## Features

* Get LikeCoin Chain's proposals.
* Notify everyone when a proposal's status updated.

## Setup

* Install Node.js and yarn.
* Clone this project.
* Navigate to project directory and install dependencies (`yarn install`).
* Create configuration file and save it as `config.json` , examples can be found on `config.example.json`
* run `yarn run deploy` for deploying commands to Discord and initialize cache database.

## Command Usage

* `/active` - Get depositing and voting proposals.
* `/latest` - Get latest proposal
* `/proposal <id>` - Get specified proposal's basic information and links to BigDipper or stake.like.co .

## License

> This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
> 
> This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
> 
> You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.