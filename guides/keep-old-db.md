# Preserving the Old Database
This guide provides instructions on how to continue using the old database and explains why the new update necessitates data loss.

## Table of Contents

### Why Must I Delete My Database and Lose All My Data?
While this change may be frustrating, it is implemented for the greater good. The old ForgeDB utilized Quick.DB, which lacked the ability to define pre-set types, posing a safety risk for developers. Additionally, the old package used an unsafe format, leading to numerous bugs. The new format is designed to eliminate these issues and prevent future breaking changes. Furthermore, the new ForgeDB allows users to choose from popular databases such as SQLite, MySQL, and MongoDB.

### How to Use the Old ForgeDB
To continue using the old ForgeDB package, either refrain from updating or install it from GitHub by downloading the `old` branch. Execute the following command:
```bash
npm i github:tryforge/ForgeDB#old
```

### Is It Possible to Retain My Database While Using the New One?
Yes, but it is not recommended due to the manual effort required. To transfer your data, execute the following ForgeScript command before deleting `forge.db`:
```
$writeFile[forge.db.json;$getDB]
```
This command creates a `forge.db.json` file containing your old database records. Then, follow the [update guide](https://github.com/tryforge/ForgeDB/blob/main/guides/how-to-update.md) to install the new ForgeDB. Manually transfer each record from `forge.db.json`, ensuring you use the appropriate function for each ID. Although time-consuming, this process allows you to update without data loss.

### Conclusion
Thank you for taking the time to read this guide. We hope it clarifies the reasons behind this update. <br>
This guide was written by the developer of this package, [aggelos](https://discord.com/users/637648484979441706).
