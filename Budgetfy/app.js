
//Budget Controller
var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = 0;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome>0){
            this.percentage = Math.round((this.value/totalIncome)*100);
       } else{
            this.percentage = 0;
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var totalExpenses = 0;


    var data = {
        allItems:{
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
                sum += cur.value;
        });
        data.total[type] = sum;
    };

    return{
        addItem: function(type, des, val){
            var newItem, ID;

            //create new ID
            if(data.allItems[type].length === 0){
                ID = 1;
            } else{
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }

            //create new item based on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            //push it into our data structure
            data.allItems[type].push(newItem);

            //return the new element
            return newItem;
        },

        deleteItem: function(type, id){
            //id = 3
            var ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);
            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function(){
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.total.inc - data.total.exp;
            if(data.total.inc > 0){
                data.percentage = Math.round((data.total.exp / data.total.inc)*100);
            } else{
                data.percentage = -1;
            }
        },

        calculatePercentages: function(){
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.total.inc);
            });
        },

        getPercentages: function(){
            var allperc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allperc;
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage
            };
        },

        testing: function(){
            console.log(data);
        }
    };


})();

//UI Controller
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercLabel: '.item__percentage',
        dateLabel : '.budget__title'
    };

    var formatNumber= function(num, type){
        var numSplit, int, dec, sign;

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');

        int  = numSplit[0];
        if(int.length>3){
            int = int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3,int.length);
        }
        dec = numSplit[1];

        type === 'exp' ? sign = '-' : sign = '+';

        return sign + ' ' + int + '.'+ dec;

    };

    return {
        getinput: function(){
            return{
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        addListItem: function(obj, type){
            var html, newHtml, element;

            //1. create html string with placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            } else if(type=== 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div> </div>'
            }

            //2. replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            //3. Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },

        deleteListItem: function(selectorID){
            var child = document.getElementById(selectorID);
            child.parentNode.removeChild(child);
        },

        clearFields: function(){
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value="";
            });

            fieldsArr[0].focus();

        },

        displayBudget: function(obj){
            var type;
            obj.budget >= 0 ? type ='inc':type='exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp,'inc');
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc,'exp');
            console.log(obj);
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '--';
            }
        },

        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMstrings.expensePercLabel);

            console.log(fields);
            var nodeListForEach = function(list, callback){
                for(var i =0; i<list.length;i++){
                    callback(list[i], i);
                }
            };

            nodeListForEach(fields, function(current, index){
                console.log(percentages[index]);
                //if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
              //  } else{
               //     current.textContent = '---';
               // }
            });
        },

        displayMonth: function(){
            var now, year, month;
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = month + ' ' +year;
        },

        changeType: function(){
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            for(var i=0; i<fields.length;i++){
                fields[i].classList.toggle('red-focus');
            }

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();


//Global App Controller
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener("click",ctrlAddItem);
        document.addEventListener("keypress", function(e){
            if(e.keyCode === 13 || e.which === 13){
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);

    };

    var updateBudget = function(){
        //update budget
        budgetCtrl.calculateBudget();
        //return the budget
        var budget = budgetCtrl.getBudget();

        UICtrl.displayBudget(budget);


    };

    var updatePercentages = function(){
        //1. calculate percentages
        budgetCtrl.calculatePercentages();
        //2. Read percentage from budget controller
        var percentages = budgetCtrl.getPercentages();
        //3. update UI with new percentages
        UICtrl.displayPercentages(percentages);
        console.log(percentages);

    };

    var ctrlAddItem = function(){

        var input, newItem;

        //1. get input data
        var input = UICtrl.getinput();
        if(input.description !== "" && !isNaN(input.value) && input.value >0){
            //console.log(input);
            //2. Add the item to the budget controller
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //3. Add the item to the UI
            UICtrl.addListItem(newItem,input.type);

            //4.clear the fields
            UICtrl.clearFields();

            //5.Calculate & update budget
            updateBudget();

            //6. calculate and update percentages
            updatePercentages();
        }

    };

    var ctrlDeleteItem = function(event){
        var splitID, type, ID;
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            //1. delete the item from data structure
            budgetCtrl.deleteItem(type, ID);
            //2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            //3. Update and show the new budget
            updateBudget();

            //4. calculate and update percentages
            updatePercentages();
        }
    };

    return{
        init: function(){
            console.log('Application has started');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
           }
    }

})(budgetController, UIController);


controller.init();
