<script lang="ts" setup>
import { useUserInfo } from '@/composables/useUserInfo';

const { avatar } = useUserInfo();
</script>

<template>
  <div class="flex items-center">
    <Avatar
      v-if="avatar"
      shape="circle"
      :image="avatar"
    />

    <Avatar
      v-else
      shape="circle"
      icon="pi pi-user"
    />
  </div>
</template>
