class PolarityUtils {
    constructor(targetId, inputVirusSeq, outputVirusSeq, callbak) {
        this.targetId = targetId;
        
        this.callbak = callbak;
        this.inputVirusSeq = inputVirusSeq;
        this.outputVirusSeq = outputVirusSeq;
        this.diffVirusSeq = '';
        this.inputPolarSeq = '';
        this.inputFiveSeq = '';
        this.outputPolarSeq = '';
        this.outputFiveSeq = '';
        this.dicInputPolar = {'P-P-X' : 0,'N-N-X' : 0,'ETC' : 0,};
        this.dicOutputPolar = {'P-P-X' : 0,'N-N-X' : 0,'ETC' : 0,};
        //Polarity feature	Polarity feature_S	Amino acid
        this.DIC_POLAR_FEATURE = {'A' : 'N','V' : 'N','L' : 'N','G' : 'N','I' : 'N','M' : 'N','W' : 'N','F' : 'N','P' : 'N','S' : 'P','C' : 'P','N' : 'P','Q' : 'P','T' : 'P','Y' : 'P','D' : 'A','E' : 'A','K' : 'B','R' : 'B','H' : 'B',};
        //Five amino acid properties 
        this.DIC_FIVE_AA = {'K' : 'E','R' : 'E','H' : 'E','D' : 'O','E' : 'O','S' : 'P','N' : 'P','Q' : 'P','T' : 'P','C' : 'S','G' : 'S','P' : 'S','A' : 'H','V' : 'H','L' : 'H','I' : 'H','M' : 'H','W' : 'H','F' : 'H', 'Y' : 'H',};
    }

    /**
     * polarity 를 계산한다.
     * @returns promise 결과
     */
    async drawVirusInfo(){
        const promises = [];

        promises.push(this.calcPolarFiveSeq());
        promises.push(this.calcPolarity());
        promises.push(this.calcDiffSeq());

        const result = await Promise.all(promises);
        return result;
    }

    /**
     * aa seq 정보를 그린다.
     * @param {string} targetId aa seq를 표시할 div id
     */
    makeVirusSeqInfo(){
        const arrSeq = Array.from(this.inputVirusSeq);
        arrSeq.forEach((seq, idx) => {
            $(`#${this.targetId}Input`)
            .append(
                $('<span class="row">')
                .append($('<span class="mut">').text(`${this.diffVirusSeq[idx] == '1' ? '↓': ''}`))
                .append($('<span class="txt color ">').html(seq == undefined ? '&nbsp;' : seq).addClass(`diffSeq${this.diffVirusSeq[idx]}`))
                .append($('<span class="txt color ">').html(this.inputPolarSeq[idx] == undefined ? '&nbsp;' : this.inputPolarSeq[idx]).addClass(`polar${this.inputPolarSeq[idx]}${this.diffVirusSeq[idx]}`))
                .append($('<span class="txt color ">').html(this.inputFiveSeq[idx] == undefined ? '&nbsp;' : this.inputFiveSeq[idx]).addClass(`five${this.inputFiveSeq[idx]}${this.diffVirusSeq[idx]}`))
            );

            $(`#${this.targetId}Output`)
            .append(
                $('<span class="row">')
                .append($('<span class="mut">').text(`${this.diffVirusSeq[idx] == '1' ? '↓': ''}`))
                .append($('<span class="txt color ">').html(this.outputVirusSeq[idx] == undefined ? '&nbsp;' : this.outputVirusSeq[idx]).addClass(`diffSeq${this.diffVirusSeq[idx]}`))
                .append($('<span class="txt color ">').html(this.outputPolarSeq[idx] == undefined ? '&nbsp;' : this.outputPolarSeq[idx]).addClass(`polar${this.outputPolarSeq[idx]}${this.diffVirusSeq[idx]}`))
                .append($('<span class="txt color ">').html(this.outputFiveSeq[idx] == undefined ? '&nbsp;' : this.outputFiveSeq[idx]).addClass(`five${this.outputFiveSeq[idx]}${this.diffVirusSeq[idx]}`))
            );
        })
    }

    /**
     * aa seq 정보를 그린다.
     * @param {string} targetId aa seq를 표시할 div id
     */
     makePolarityInfo(){
        for (let key in this.dicInputPolar){
            $(`#${this.targetId}Tbl > tbody`)
            .append(
                $('<tr>')
                .append($('<td>').text(key))
                .append($('<td>').text(this.dicInputPolar[key]))
                .append($('<td>').text(this.dicOutputPolar[key]))
                );
        }
    }

    /**
     * input, output virus seq를 이용하여  polarity 및 five properties 정보를 만든다.
     */
    calcPolarFiveSeq(){
        return new Promise((resolve, reject) => {
            //input, output virus seq를 이용하여 polar, five seq를 만든다.
            const arrInputSeq = Array.from(this.inputVirusSeq);
            const arrOutputSeq = Array.from(this.outputVirusSeq);

            //input virus seq 변환
            arrInputSeq.map(seq => {
                //pola 기준으로 변환
                this.inputPolarSeq += this.DIC_POLAR_FEATURE[seq];
                //five 기준으로 변환
                this.inputFiveSeq += this.DIC_FIVE_AA[seq];
            });

            //ouput virus seq 변환
            arrOutputSeq.map(seq => {
                //pola 기준으로 변환
                this.outputPolarSeq += this.DIC_POLAR_FEATURE[seq];
                //five 기준으로 변환
                this.outputFiveSeq += this.DIC_FIVE_AA[seq];
            });

            resolve(true)
        });
    }

    /**
     * input, output virus에 대한 polaity를 계산한다.
     * @returns ploaity 계산 결과
     */
    calcPolarity(){
        return new Promise((resolve, reject) => {
            //input polar aa 건수 계산
            for (let i=0; i<this.inputPolarSeq.length -2; i++){
                if (this.inputPolarSeq.slice(i, i+3) == 'PPA' || this.inputPolarSeq.slice(i, i+3) == 'PPB') this.dicInputPolar['P-P-X'] += 1
                else if (this.inputPolarSeq.slice(i, i+3) == 'NNA' || this.inputPolarSeq.slice(i, i+3) == 'NNB') this.dicInputPolar['N-N-X'] += 1
                else this.dicInputPolar['ETC'] += 1;
            }

            //output polar aa 건수 계산
            for (let i=0; i<this.outputPolarSeq.length -2; i++){
                if (this.inputPolarSeq.slice(i, i+3) == 'PPA' || this.inputPolarSeq.slice(i, i+3) == 'PPB') this.dicOutputPolar['P-P-X'] += 1
                else if (this.inputPolarSeq.slice(i, i+3) == 'NNA' || this.inputPolarSeq.slice(i, i+3) == 'NNB') this.dicOutputPolar['N-N-X'] += 1
                else this.dicOutputPolar['ETC'] += 1;
            }

            resolve(true)
        });

    }

    /**
     * input virus seq와 output virus seq가 서로 다른 위치를 체크한다.
     */
    calcDiffSeq(){
        return new Promise((resolve, reject) => {
            for (let i=0; i<this.inputVirusSeq.length; i++){
                if (this.inputVirusSeq[i] == this.outputVirusSeq[i]) this.diffVirusSeq +='0'
                else this.diffVirusSeq +='1'
            }
            resolve(true)
        });
    }
}







