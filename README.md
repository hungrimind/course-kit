# Course Kit

This package is the open source UI that is used for the courses on [hungrimind.com](https://hungrimind.com).

![Course User Interface](https://i.imgur.com/d4MNfBc.png)

It takes in a JSON file as an input, and handles everything courses related within the component. Inside the GitHub repo in the `test` folder you can find a `test.json` file. 

The JSON file is a course id followed by a list of **lessons**. There are 3 lesson types, and each lesson type has specific fields. Below are the possible lesson types and fields


| Lesson Type (defined by `sectionType` in JSON) | Field Name     | Field Description                                                                                                              |
| ---------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| "header"                                       | `sectionType`  | Has to be "header".                                                                                                            |
|                                                | `id`           | Identifier for that lesson.                                                                                                    |
|                                                | `image`        | Main promo image for the course.                                                                                               |
|                                                | `links`        | List of links to showcase. Need to contain `type` and `url` fields. Currently only "github" and "discord" types are available. |
|                                                | `content`      | Markdown section describing the course or persuading them to take it. Or it can contain whatever markdown you desire.          |
|                                                | `headline`     | Name of the course.                                                                                                            |
|                                                | `subheadline`  | Subtitle of the course.                                                                                                        |
| "slide"                                        | `sectionType`  | Has to be "slide".                                                                                                             |
|                                                | `id`           | Identifier for that lesson.                                                                                                    |
|                                                | `type`         | Can contain either image or code. Currently "image", "flutter", "yaml", "md" are supported.                                    |
|                                                | `content`      | Markdown explaining the section topic.                                                                                         |
|                                                | `value`        | Depending on the `type` can be either a link to image or code.                                                                 |
|                                                | `heading`      | Title for the slide. Used for table of contents as well.                                                                       |
|                                                | `file`         | Name of the file for code snippets. **optional, and only for code types**                                                      |
|                                                | `highlight`    | Which lines should be highlighted in the code snippets. **optional, and only for code types**                                  |
|                                                | `previewImage` | A preview image of what UI should look like for the code. **optional, and only for code types**                                |
| "md"                                           | `sectionType`  | Has to be "md".                                                                                                                |
|                                                | `id`           | Identifier for that lesson.                                                                                                    |
|                                                | `content`      | Markdown.                                                                                                                      |
|                                                | `heading`      | Title. Used for table of contents as well.                                                                                     |

## Local development

### First run

1. Clone this repository
2. run `make link` 
3. run `make install`
4. run `make watch`
5. run either `make astro` or `make next` depending on which framework you want to use.

### Subsequent runs

Run step 4 and 5 from the above list.
