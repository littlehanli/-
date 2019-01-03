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
        //bound.graphics.beginStroke("Black").drawRect(100,300,470,130);
        stage.addChild(bound);

        let tree = [new createjs.Bitmap(repo.getResult('tree0')),
                    new createjs.Bitmap(repo.getResult('tree1')),
                    new createjs.Bitmap(repo.getResult('tree2')),
                    new createjs.Bitmap(repo.getResult('tree3')),
        ];

        /*Grow up tree*/
        let t=0;
        let light = 0;
        tree[light].set({scaleX: 0.2, scaleY: 0.2});
        tree[light].set({x: 30, y: 30});
        stage.addChild(tree[light]);
        let intervalId=null;
        let growTree=function() {
            if (t == 10) {
                stage.removeChild(tree[light]);
                light++;
                if (light == 2) {
                    console.log("Congratulation!");
                    clearInterval(intervalId);
                    clearInterval(hazard);
                }
                tree[light].set({scaleX: 0.2, scaleY: 0.2});
                tree[light].set({x: 30, y: 30});
                stage.addChildAt(tree[light],0);
                t=0;
            }
            else t++;
            /*Too many bug then dead*/
            if(count > 10) {
                stage.removeChild(tree[light]);
                light=3;
                tree[light].set({scaleX: 0.2, scaleY: 0.2});
                tree[light].set({x: 30, y: 30});
                stage.addChildAt(tree[light],0);
                console.log("It's dead!");
                clearInterval(intervalId);
            }
        };
        intervalId = setInterval(growTree,2000);

        // tree[Math.floor(light/250)].set({scaleX:0.2, scaleY:0.2});
        // tree[Math.floor(light/250)].set({x:30,y:30});
        // stage.addChild(tree[Math.floor(light/250)]);

        /*Bug Hazard*/
        let count=0;
        let hazard=null;
        let bugEvent= function(){
            let bug = new createjs.Bitmap(repo.getResult('bug'));

            bug.set({scaleX:0.2,scaleY:0.2});
            bug.set({x:100+Math.floor(Math.random()*1000)%470,
                y:300+Math.floor(Math.random()*1000)%130});
            stage.addChild(bug);
            console.log("bug : "+ count++);
            createjs.Tween.get(bug).to({x:bug.x+(100-Math.floor(Math.random()*200)),
                y:bug.y+(100-Math.floor(Math.random()*200))},20000);
            bug.on('click',() => {
                count--;
                stage.removeChild(bug);
            });
            if(count>10) clearInterval(hazard);
        }
        hazard = setInterval(bugEvent,3000);


    }

    setup();
});