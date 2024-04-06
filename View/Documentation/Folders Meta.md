---
aliases:
  - Meta Folder
class: View
from:
  - "[[View/Documentation/Folders Core|Core Folder]]"
order:
---
# Notes

> Path: `Core/Meta/`

Sometimes it is nice to use links for property values instead of just strings. It allows you to easily see all notes that have that common link, reduces typos, and makes it easier to support selects/multi-selects for properties. The only issue is that you do not want to fill your [[View/Documentation/Folders Database|Database Folder]] with notes that you are just using for linking purposes and never add meaningful data to. This is when I use the meta folder to store notes just for the purpose of linking other files to.

> [!example]
> The options for the `status` property on [[View/Documentation/Folders Class#BaseTask|Classes]] comes from the `Core/Meta/Status/Basic/` folder.

# Meta List

## Company

Company notes are used to link together products that are all produced by the same organization.

## Genre

Genres are categories that media can be placed into to group similar media together. For example this will allow you to find all comedy [[View/Documentation/Folders Class#Book|books]], [[View/Documentation/Folders Class#Movie|movies]], [[View/Documentation/Folders Class#Show|shows]], & [[View/Documentation/Folders Class#VideoGame|video games]].

## Priority

How important something (generally a [[View/Documentation/Folders Class#BaseTask|task]]) is compared to other things.

### Basic

Here is how I use the priorities, but feel free to use them differently.
- Highest: I should work on  this as soon as I can. For example, if I am going to play a [[View/Documentation/Folders Class#VideoGame|video game]], I should try to complete one with this priority before picking something new up.
- High: If I am looking for something new to start, this is where I should look first. These are tasks I am more interested in getting done, but are generally not started yet and can wait.
- Middle: I am averagely interested in working on this thing, but it is also fine if I constantly come up with new higher priority things to do.
- Low: These are things I will do if I run out of everything else and I am bored, but they are unlikely to ever get done.
- Lowest: List of things I hope to never work on, but still wanted to take notes about. For example, if a few friends say a movie is bad I would add the movie with this priority to keep from watching it.

## Status

The current state of something  (generally a [[View/Documentation/Folders Class#BaseTask|task]]).

### Basic

Here is how I use the priorities, but feel free to use them differently.
- To Do: Something I have not started work on yet.
- In Progress: Something I started, but have not finished.
- Done: Something I completed.
- Blocked: Something I can not work on right now. For example, a book I want to read that is not published or a game I can not play without my friend because it takes two.

## Type

Category of the given class that it falls into. There will be specific folders for each [[View/Documentation/Folders Class|class]] that uses it.

### Place

Type of [[View/Documentation/Folders Class#Place|place]].

## VideoGameConsole

Console that a [[View/Documentation/Folders Class#VideoGame|video game]] is available on.

## VideoGameEngine

Game engine that a [[View/Documentation/Folders Class#VideoGame|video game]] was developed in.
