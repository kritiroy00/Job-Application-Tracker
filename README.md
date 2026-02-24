1.
-Use getElementById() for a single unique element.

-Use querySelector() and querySelectorAll() for more flexible selection.

-getElementsByClassName() returns a live collection.

2.
-createElement() -> Creates a new element

-textContent -> Adds text

-appendChild() / append() -> Inserts it into the DOM

3.
-Event Bubbling = Event moves from child to parent.

-It happens by default in JavaScript.

-Use stopPropagation() to stop it.

4.
-Event Delegation uses event bubbling.

-Add event listener to a parent.

-Detect the clicked child using (event.target.)

-Useful for dynamic and large lists of elements.

5.
preventDefault() -> Stops browser’s default behavior.

stopPropagation() -> Stops event from moving to parent elements.

They solve different problems and can be used together if needed.