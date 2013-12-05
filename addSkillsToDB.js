db.skills.remove()
db.skills.insert([{
"_id" : ObjectId("529ec29fd1f5d57e13000001"),
"child" : [
ObjectId("529ec2e452be389013000001")
],
"description" : "JavaScript on the server side.",
"exam" : null,
"name" : "Node",
"openStatus" : 0,
"parent" : ObjectId("529ebaecd127701a8100177d"),
"version" : 0
},
{
"_id" : ObjectId("529ec30c49919c9f13000001"),
"name" : "AJAX",
"description" : "async java and xml",
"parent" : ObjectId("529ebabcd127701a8100177c"),
"exam" : null,
"version" : 0,
"openStatus" : 0,
"child" : [ ]
},
{
"_id" : ObjectId("529ebabcd127701a8100177c"),
"child" : [
ObjectId("529ebaecd127701a8100177d"),
ObjectId("529ec0dad127701a8100177e"),
ObjectId("529ec30c49919c9f13000001")
],
"description" : "HyperText Markup Language",
"exam" : null,
"name" : "HTML",
"openStatus" : 0,
"parent" : null,
"version" : 1
}])

db.skills.insert([{
"_id" : ObjectId("529ec0dad127701a8100177e"),
"child" : [ ],
"decription" : "Cascading StyleSheets",
"exam" : null,
"name" : "CSS",
"openStatus" : 0,
"parent" : ObjectId("529ebabcd127701a8100177c"),
"version" : 1
},
{
"_id" : ObjectId("529ebaecd127701a8100177d"),
"child" : [
ObjectId("529ec29fd1f5d57e13000001")
],
"description" : "A Scripting Language",
"exam" : null,
"name" : "JavaScript",
"openStatus" : 0,
"parent" : ObjectId("529ebabcd127701a8100177c"),
"version" : 1
},
{
"_id" : ObjectId("529ec2e452be389013000001"),
"name" : "Backbone",
"description" : "It's a backbone.",
"parent" : ObjectId("529ec29fd1f5d57e13000001"),
"exam" : null,
"version" : 0,
"openStatus" : 0,
"child" : [ ]
}])

db.skills.find().pretty()