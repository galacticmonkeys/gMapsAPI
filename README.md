gMapsAPI
========
@ClickTime Dev Team:

I have this weird habit of working in wee hours in the morning and wrote/tested this when public transit was closed. 
I received a zero_results status from the API when requesting transit options and attributed it to the fact that everything
was closed. I realized this morning after submission to Sarah that it's because the API doesn't support public transit travel 
options with waypoints. Here's how I would make it work: making multiple direction requests and then appending the results.

Thank you for reviewing! :)
