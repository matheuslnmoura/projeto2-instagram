let marginLeftNumber = 0;


// Renaming the document.querySelector and document.querySelectorAll command 
const dQS = (el)=> {
    return document.querySelector(el);
};

const dQSA = (el)=> {
    return document.querySelectorAll(el);
};

/*---------------Interface--------------*/
//Stories
storiesJson.map((item, index)=>{
    //Cloning <cloneNode> command the indicated HTML structure and all its content <true> command and recording the information on the <story> variable
    let story = dQS('.story').cloneNode(true); 

    // Filling in the clones' information

    
    story.querySelector('.story-bg img').src = item.img;
    story.querySelector('.story-text').innerHTML = textCollapse(item.name, 9);

    //Adding the clones <story> on the indicated container <.stories-full-container>
    dQS('.stories-full-container').append(story);
    storyBorder(item.closeFriends, index); //Changing close-friends border



});






/*---------------Functions--------------*/

function textCollapse(text, maxLength) {
    let newText = '';
    if (text.length >= maxLength) {
        for (let i=0; i<=(maxLength-3); i++) {
            newText += text[i];
        } 
        newText += '...'
    } else {
        newText = text;
    }

    return newText;
}

function storyBorder(closeFriendsValue, storyIndex) {
    if (closeFriendsValue == true) {
        dQS(`.story:nth-child(${storyIndex + 1}) .story-border`).classList.remove ('default-border');
        dQS(`.story:nth-child(${storyIndex + 1}) .story-border`).classList.add('close-friends-border');
    } else {
    }
}




function slideButtonRight() {
    let storiesTotalWidthString = getComputedStyle(dQS('.stories-full-container')).width;
    let storiesTotalWidthSliced =  storiesTotalWidthString.slice(0, -2);
    let storiesTotalWidth = parseInt(storiesTotalWidthSliced);

    let firstStoryMarginLeftString = getComputedStyle(dQS('.story:nth-of-type(1)')).marginLeft;
    let firstStoryMarginLeftSliced =  firstStoryMarginLeftString.slice(0, -2);
    let firstStoryMarginLeft = parseInt(firstStoryMarginLeftSliced);

    let singleStoryWidth = (storiesTotalWidth - firstStoryMarginLeft) / storiesJson.length


    let sliderFullContainer = dQS('.stories-full-container');

    if (marginLeftNumber < storiesTotalWidth - 700) {
        marginLeftNumber += singleStoryWidth*3.62;
        sliderFullContainer.style.marginLeft = `-${marginLeftNumber}px`;
    } else {
        dQS('.slide-button--right').classList.add('no-display');
    }


    dQS('.slide-button--left').classList.remove('no-display');

    return marginLeftNumber;

}

function slideButtonLeft() {
    dQS('.slide-button--right').classList.remove('no-display');

    let storiesTotalWidthString = getComputedStyle(dQS('.stories-full-container')).width;
    let storiesTotalWidthSliced =  storiesTotalWidthString.slice(0, -2);
    let storiesTotalWidth = parseInt(storiesTotalWidthSliced);

    let firstStoryMarginLeftString = getComputedStyle(dQS('.story:nth-of-type(1)')).marginLeft;
    let firstStoryMarginLeftSliced =  firstStoryMarginLeftString.slice(0, -2);
    let firstStoryMarginLeft = parseInt(firstStoryMarginLeftSliced);

    let singleStoryWidth = (storiesTotalWidth - firstStoryMarginLeft) / storiesJson.length


    let sliderFullContainer = dQS('.stories-full-container');

    marginLeftNumber -= singleStoryWidth*3.62;
    sliderFullContainer.style.marginLeft = `-${marginLeftNumber}px`;

    if(marginLeftNumber != 0) {
        dQS('.slide-button--left').classList.remove('no-display');
    } else {
        setTimeout(()=>{
            dQS('.slide-button--left').classList.add('no-display');
        }, 400);
        
    }


    return marginLeftNumber;

    

}






/*---------------Events--------------*/

dQS('.slide-button--right').addEventListener('click', slideButtonRight, true); 
dQS('.slide-button--left').addEventListener('click', slideButtonLeft);


