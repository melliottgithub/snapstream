<template>
  <div class="flex justify-center">
    <div class="p-4">
      <h1 class="text-2xl font-bold">Question 1</h1>
      <form @submit.prevent="convertNumber">
        <div class="mt-4">
          <label for="number" class="block mb-2">Number:</label>
          <input type="number" id="number" v-model.number="number" class="w-full px-2 py-1 border border-gray-300 rounded" />
        </div>
        <div class="mt-4">
          <label for="base" class="block mb-2">Base:</label>
          <input type="number" id="base" v-model.number="base" class="w-full px-2 py-1 border border-gray-300 rounded" />
        </div>
        <button class="mt-4 px-4 py-2 bg-blue-500 text-white" type="submit">Convert</button>
      </form>
      <div v-if="convertedNumber" class="mt-4">
        Converted Number: {{ convertedNumber }}
      </div>
      <div v-else-if="number === 0 || base === 0" class="mt-4">
        Please enter both number and base.
      </div>
      <div v-else-if="isNaN(number) || isNaN(base) || base < 2 || base > 32" class="mt-4">
        Invalid input. Please enter a valid number and base between 2 and 32.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      number: 0,
      base: 0,
      convertedNumber: ''
    }
  },
  methods: {
    convertNumber(): void {
      if (this.number === 0 || this.base === 0) {
        this.convertedNumber = ''
        return
      }

      const num: number = parseInt(this.number.toString())
      const base: number = parseInt(this.base.toString())

      if (isNaN(num) || isNaN(base) || base < 2 || base > 32) {
        this.convertedNumber = 'Invalid input'
        return
      }

      this.convertedNumber = this.numToStringBase(num, base)
    },
    numToStringBase(number: number, base: number): string {
      const digits: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let result: string = ''

      if (number === 0) {
        return '0'
      }

      while (number > 0) {
        const remainder: number = number % base
        result = digits.charAt(remainder) + result
        number = Math.floor(number / base)
      }

      return result
    }
  }
});
</script>

<style>
</style>
