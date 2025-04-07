export default function preCheck(input) {
    console.log("Running precheck...");
    return input.replace(/-/g, " minus ").replace(/\*/g, " times ");
}
