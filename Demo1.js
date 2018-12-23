$(document).ready(()=>{ // jQuery main

    let stage = new createjs.Stage(canvas);
    let repo = new createjs.LoadQueue();

    function setup() {
        // automatically update
        createjs.Ticker.on("tick", e => stage.update()); //每次更新呼叫這個函式
        createjs.Ticker.framerate = 60; //一秒鐘更新六十次
        repo.loadManifest([{id:'tree0',src:"../images/Germination.png"},
                           {id:'tree1',src:"../images/GreenLeaf.png"},
                           {id:'tree2',src:"../images/RedLeaf.png"},
                           {id:'tree3',src:"../images/Wither.png"},
                           {id:'bug',src:"../images/bug.png"}
        ]);
        repo.on('complete', main); //Wait until all assets are loaded
    }

    function main(){
        let bound = new createjs.Shape();
        bound.graphics.beginStroke("Black").drawRect(100,300,470,130);
        stage.addChild(bound);
        let light = 550;
        let tree = [new createjs.Bitmap(repo.getResult('tree0')),
                       new createjs.Bitmap(repo.getResult('tree1')),
                       new createjs.Bitmap(repo.getResult('tree2')),
                       new createjs.Bitmap(repo.getResult('tree3')),
        ];
        let bug = new createjs.Bitmap(repo.getResult('bug'));
        tree[Math.floor(light/250)].set({scaleX:0.2, scaleY:0.2});
        tree[Math.floor(light/250)].set({x:30,y:30});
        stage.addChild(tree[Math.floor(light/250)]);
        bug.set({scaleX:0.2,scaleY:0.2});
        bug.set({x:100+Math.floor(Math.random()*1000)%470,y:300+Math.floor(Math.random()*1000)%130});
        stage.addChild(bug);
        bug.on('click',() => {
            stage.removeChild(bug);
            bug.set({scaleX:0.2,scaleY:0.2});
            bug.set({x:100+Math.floor(Math.random()*1000)%470,y:300+Math.floor(Math.random()*1000)%130});
            stage.addChild(bug);
        });

    }

    setup();

});