# Rules to be followed for text input (implemented in precheck)

-   use `comma`, `colon` for break/gap in the speech
-   never use `*` for multiplication (write the word `times` instead)
-   use `-` for the word plus or minus
-   `ax` results in axe, use `"A" x` instead
-   use `^` for "to the power of"

# SSML Syntax:

```
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="en-US">
    <voice name="en-US-AndrewNeural">
        <p>
            Born in the quiet town of <emphasis level="moderate">Ulm</emphasis> in <say-as interpret-as="date" format="yyyy">1879</say-as>, there lived a boy who was fascinated by a compass. <prosody rate="slow">"Something deeply hidden had to be behind things."</prosody>
        </p>

        <break time="500ms"/>

        <p>
            He was a quarrelsome child — <break time="200ms"/> not because he lacked discipline, but because his mind wandered beyond walls. <prosody rate="slow">"Creativity is crushed under the weight of traditional teaching."</prosody>
        </p>
    </voice>
</speak>
```

## Caution

Don't use prosody rate="slow", use rate="medium"
