# Defining how users can interact with the application

## A Node class
```
class Node {
    public:
        id
        contents
        parents
        title
}
```

## An interface to interact with the graph
```
interface Graph {

    def addNode(title, contents, parents=[]) 

    def deleteNode(title)
        // What happens if deleted node has children? 

    def modifyNode(title, newContents)

    def getNodeID(title | contents)

    def addConnection(id_a, id_b)

    def removeConnection(id_a, id_b)
}
```

## Terminal commands
- `add node title="" contents="" (parentsContain="" | parentsIds=[])`
- `remove node (id=id | contains="")`
- `get-id contains=""`
- `connect id1 id2`

